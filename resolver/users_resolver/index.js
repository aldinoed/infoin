const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const model = require("../../models");
const { Op, where } = require("sequelize");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  getAllUser: async (req, res) => {
    let users = [];
    try {
      users = await model.User.findAll();
      if (users.length > 0) {
        res.json(users);
      } else {
        throw new Error("Tidak ada data.");
      }
    } catch (error) {
      res.status(500).json({ status: false, message: `Error: ${error}` });
    }
  },
  getUserDetail: async (req, res) => {
    const { id } = req.params;
    try {
      const users = await model.User.findAll({ where: { id: id } });
      if (Object.keys(users).length > 0) {
        res.json(users);
      } else {
        throw new Error("Tidak ada data.");
      }
    } catch (error) {
      res.status(500).json({ status: false, message: `Error: ${error}` });
    }
  },
  createUser: async (req, res) => {
    const { newEmail, newFullname, newPassword } = req.body;

    try {
      const newUser = await model.User.create({
        email: newEmail,
        fullname: newFullname,
        password: newPassword,
      });
      res.status(200).json({
        status: true,
        message: `User ${newFullname} successfully inserted`,
      });
    } catch (error) {
      res.status(500).json({ status: true, message: `Error: ${error}` });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { newFullname, newEmail, newPassword } = req.body;

    try {
      const response = await model.User.update(
        { fullname: newFullname, email: newEmail, password: newPassword },
        { where: { id: id } }
      );
      if (response == 1) {
        res.status(200).json({
          status: true,
          message: `User ${newFullname} berhasil diupdate`,
        });
      } else {
        throw new Error("Update user gagal");
      }
    } catch (error) {
      res.status(500).json({ status: true, message: `Error: ${error}` });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const response = await model.User.destroy({
        where: {
          id: id,
        },
      });
      if (response > 0) {
        res
          .status(200)
          .json({ status: true, message: "Berhasil menghapus user." });
      } else {
        res.status(403).json({
          status: false,
          message: `User dengan id ${id} tidak ditemukan`,
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: `Error: ${error}` });
    }
  },
};
