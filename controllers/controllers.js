import MenuDAO from "../models/menuModel.js";
import OrderDAO from "../models/ordersModel.js";
import * as utils from "../lib/utils.js";
import db from "../config/users.js";

const menu = new MenuDAO("./data/menu.db");
const order = new OrderDAO("./data/orders.db");

const controllers = {
  newList: async (req, res) => {
    await menu.init();
    res.redirect("/");
  },

  listMenu: async (req, res) => {
    try {
      const list = await menu.getAllEntries();
      res.json(list);
      console.log(list);
    } catch (err) {
      console.log("promise rejected", err);
    }
  },

  listOrders: async (req, res) => {
    try {
      const list = await order.getAllEntries();
      res.json(list);
    } catch (err) {
      console.log("promise rejected", err);
    }
  },

  addOrder: async (req, res) => {
    try {
      console.log("req body to add to database : ", req.body);
      await order.addEntry(req.body);
      res.status(201).json({ message: "order received", order: req.body });
    } catch (err) {
      console.log("promise rejected", err);
      res.status(500).json({ error: "Failed to add order" });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      await order.deleteEntry(req.body._id);
      console.log("item deleted");
      res.redirect("/viewOrders");
    } catch (err) {
      console.log("promise rejected", err);
      res.status(500).json({ error: "Failed to delete order" });
    }
  },

  processLogin: async (req, res, next) => {
    try {
      console.log("Login request received: ", req.body);
      const user = await db.findOne({ username: req.body.username });
      console.log(user);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          username: user.username,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    } catch (err) {
      console.log("Login error: ", err);
      res.status(500).json({ success: false, msg: "Database error" });
    }
  },

  processNewUser: async (req, res, next) => {
    try {
      console.log("Registration request received: ", req.body);
      const user = await db.findOne({ username: req.body.username });
      if (user) {
        return res
          .status(409)
          .json({ success: false, msg: "Username already exists" });
      }

      const saltHash = utils.genPassword(req.body.password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;

      const newUser = {
        username: req.body.username,
        hash: hash,
        salt: salt,
      };

      const insertedUser = await db.insert(newUser);
      res.json({ success: true, user: insertedUser });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  },
  displayAppData: async (req, res, next) => {
    try {
      const list = await order.getAllEntries();
      let listOrders = "";
      list.forEach((item, index) => {
        let foodOrder = item.order.slice(2, item.order.length).toString();
        console.log(foodOrder);
        let nextOrder =
          index +
          1 +
          ": Table number: " +
          item.order[1] +
          " Food ordered: " +
          foodOrder +
          "<br >";
        console.log(nextOrder);
        listOrders = listOrders + nextOrder;
      });
      console.log(listOrders);

      res.status(200).json({
        success: true,
        msg: listOrders,
      });
    } catch (err) {
      console.log("promise rejected", err);
      res.status(500).json({ error: "Failed to display app data" });
    }
  },
};

export default controllers;
