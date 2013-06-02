$(function() {

  var ScoreItemModel = Backbone.Model.extend({
    defaults: function() {
      return {
        playerName: "",
        score: 0,
        selected: false
      };
    },
    setSelected: function() {
      this.collection.setSelected(this);
    }
  });

  var ScoreItemModelCollection = Backbone.Collection.extend({
    model: ScoreItemModel,
    comparator: function (item) {
      return item.get("score") * -1;
    },
    url: "/api/scoreboard/all",
    initialize: function() {
      this.selected = null;
    },
    setSelected: function(ScoreItemModel) {
      if (this.selected) {
        this.selected.set({selected:false});
      }
      ScoreItemModel.set({selected:true});
      this.selected = ScoreItemModel;
    }
  });

  var ScoreItemModelView = Backbone.View.extend({
    tagName:  "li",
    template: _.template($("#item-template").html()),
    events: {
      "click span.name": "setSelected",
      "click span.score": "setSelected"
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    setSelected: function() {
      this.model.setSelected();
    }
  });

  var AppView = Backbone.View.extend({
    el: $("#main"),
    events: {
      "click a.inc": "incScore",
      "click a.dec": "decScore"
    },
    initialize: function() {
      this.selectedPlayer = this.$("#selectedPlayer");
      this.listenTo(scoreBoard, "add", this.render);
      this.listenTo(scoreBoard, "change", this.selectItem);
      this.leaderboard = this.$("#leaderboard");
      this.main = this.$("#main");
      this.loadData();
    },
    loadData: function() {
      scoreBoard.fetch({
        error: function(err) {
          alert(err);
        }
      });
    },
    incScore: function() {
      var item = scoreBoard.selected;
      if(item) item.set("score", item.get("score") + 5);
      scoreBoard.sort();
      this.render();
    },
    decScore: function() {
      var item = scoreBoard.selected;
      if(item) item.set("score", item.get("score") - 5);
      scoreBoard.sort();
      this.render();
    },
    render: function() {
      this.leaderboard.empty();
      scoreBoard.each(function(item) {
        this.$(leaderboard).append(new ScoreItemModelView({model: item}).render().el);
      }, this);
    }
  });

  var scoreBoard = new ScoreItemModelCollection();
  var scoreBoardApp = new AppView();
});