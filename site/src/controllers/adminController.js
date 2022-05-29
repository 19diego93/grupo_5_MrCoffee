const adminController = {
  createProducts: (req, res) => {
    res.render("admin/createProducts");
  },
  editProducts: (req, res) => {
    res.render("admin/editProducts");
  },
};

module.exports = adminController;
