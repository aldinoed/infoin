const express = require("express");
const app = express();
const sequelize = require("../../connection");
const bodyParser = require("body-parser");
const model = require("../../models");
const { Op, where } = require("sequelize");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  getAllPosts: async (req, res) => {
    let posts = [];
    try {
      posts = await model.Post.findAll();
      if (posts.length > 0) {
        res.json(posts);
      } else {
        throw new Error("Tidak ada data.");
      }
    } catch (error) {
      res.status(500).json({ status: false, message: `Error: ${error}` });
    }
  },
  getPostDetail: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await model.Post.findAll({ where: { id: id } });
      if (Object.keys(post).length > 0) {
        res.json(post);
      } else {
        throw new Error("Tidak ada data.");
      }
    } catch (error) {
      res.status(500).json({ status: false, message: `Error: ${error}` });
    }
  },
  createPost: async (req, res) => {
    const { userId, postTitle, postContent } = req.body;

    try {
      const newPost = await model.Post.create({
        user_id: userId,
        post_title: postTitle,
        post_content: postContent,
      });
      res.status(200).json({
        status: true,
        message: `User ${postTitle} successfully inserted`,
      });
    } catch (error) {
      res.status(500).json({ status: true, message: `Error: ${error}` });
    }
  },
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { newFullname, newEmail, newPassword } = req.body;

    try {
      const response = await model.Post.update(
        { fullname: newFullname, email: newEmail, password: newPassword },
        { where: { id: id } }
      );
      if (response == 1) {
        res.status(200).json({
          status: true,
          message: `Post ${newFullname} berhasil diupdate`,
        });
      } else {
        throw new Error("Update postingan gagal");
      }
    } catch (error) {
      res.status(500).json({ status: true, message: `Error: ${error}` });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;

    try {
      const response = await model.Post.destroy({
        where: {
          id: id,
        },
      });
      if (response > 0) {
        res
          .status(200)
          .json({ status: true, message: "Berhasil menghapus postingan." });
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
