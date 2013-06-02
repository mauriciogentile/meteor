exports.all = function(req, res, next) {
	var scoreBoard = [
		{playerName: "Scottie Pippen", score: 950, pictureUrl: "http://bossip.files.wordpress.com/2012/03/scottie-pippen1-e1332248338856.jpg?w=550&h=416"},
		{playerName: "Gary Payton", score: 970, pictureUrl: "http://hollywoodnose.com/images/net_worth4/gary-payton-wealth/how-much-is-gary-payton-worth.jpg"},
		{playerName: "Karl Malone", score: 830, pictureUrl: "http://www.nndb.com/people/363/000050213/karlmalone03.jpg"},
		{playerName: "Charles Barkley", score: 825, pictureUrl: "http://blogs-images.forbes.com/karlshmavonian/files/2012/01/Barkley_Lipofsky.jpg"},
		{playerName: "Manu Ginobili", score: 750, pictureUrl: "http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/allstar/2011/emanuel_ginobili_250.jpg"},
		{playerName: "Steve Nash", score: 1005, pictureUrl: "http://i.cdn.turner.com/nba/nba/media/playerfile/steve_nash.jpg"},
		{playerName: "LeBron James", score: 1010, pictureUrl: "http://i.cdn.turner.com/nba/nba/media/playerfile/lebron_james.jpg"}
	];
	res.json(scoreBoard);
};