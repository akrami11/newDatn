class Controller {
  index(req, res) {
    res.render('home');
  }
}

module.exports = new Controller();