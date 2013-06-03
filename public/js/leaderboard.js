$(function() {

  var ScoreItemModel = Backbone.Model.extend({
    defaults: function() {
      return {
        playerId: -1,
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

  var AppModel = Backbone.Model.extend({
    defaults: function() {
      return {
        io: null,
        scoreBoard: null
      };
    },
    initialize: function() {
      self = this;
      this.scoreBoard = new ScoreItemModelCollection();
      this.listenTo(this.scoreBoard, "change", this.sort);
      this.listenTo(this.scoreBoard, "add", this.sort);
      this.scoreBoard.fetch({
        error: function(err) {
          alert(err);
        }
      });
      this.connectToServer();
    },
    connectToServer: function () {
      var self = this;
      this.io = io.connect('http://localhost:1234');
      this.io.on("new_score", function(data) {
          var players = self.scoreBoard.where({playerId: data.playerId});
          if(players.length) {
            players[0].set("score", data.score);
            self.sort();
          }
      });
    },
    pubNewScore: function(pubScoreInfo) {
      this.io.emit("pub_new_score", pubScoreInfo);
    },
    sort: function() {
      this.scoreBoard.sort();
    },
    updateScore: function(score) {
      var item = this.scoreBoard.selected;
      if(item) item.set("score", item.get("score") + score);
      if(this.io.socket.connected) {
        this.pubNewScore({playerId: item.get("playerId"), score: item.get("score")});
      }
    }
  });

  var AppView = Backbone.View.extend({
    el: $("#main"),
    events: {
      "click .inc": "incScore",
      "click .dec": "decScore"
    },
    initialize: function() {
      this.listenTo(this.model.scoreBoard, "add", this.render);
      this.listenTo(this.model.scoreBoard, "change", this.render);
      this.selectedPlayer = this.$("#selectedPlayer");
      this.leaderboard = this.$("#leaderboard");
      this.main = this.$("#main");
    },
    incScore: function() {
      this.model.updateScore(5);
      //this.render();
    },
    decScore: function() {
      this.model.updateScore(-5);
      //this.render();
    },
    render: function() {
      this.leaderboard.empty();
      this.model.scoreBoard.each(function(item) {
        this.$(leaderboard).append(new ScoreItemModelView({model: item}).render().el);
      }, this);
    }
  });

  var scoreBoardApp = new AppView({model: new AppModel()});
});