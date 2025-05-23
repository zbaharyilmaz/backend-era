"use strict";
const Todo = require("../models/todo.model");
module.exports = {
  list: async (req, res) => {
    //const result= await Todo.findAll()  //array döndü. (select * from)
    // findAll(["title", "description"]) (select title, description from)
    const result = await Todo.findAndCountAll();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    // const result= await Todo.create({
    //   title: "todo-2",
    //   description: "description-2",
    //   priority: 0,
    //   isDone: false,
    // });

    const result = await Todo.create(req.body);
    res.status(201).send({
      error: false,
      result: result,
    });
  },
  read: async (req, res) => {
    //const result= await Todo.findOne({where: {id: req.params}})
    const result = await Todo.findByPk(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Todo.update(req.body, {
      where: { id: req.params.id },
    }); //retun [0] or [1]
    //Todo.update({...newData},{...where})
    res.status(202).send({
      error: false,
      result,
      new: await Todo.findByPk(req.params.id), // burda updated olan da read edilir.
    });
  },
  delete: async (req, res) => {
    const result = await Todo.destroy({ where: { id: req.params.id } }); //destroy sadece koşul alır, yani where. Return 1 or 2.
    // res.status(204).send({
    //   error:false,
    //   result,
    // })
    if (result) {
      res.sendStatus(204);
    } else {
      //  res.status(404).send({
      //  error:true,
      //  message: "Data is not found or it is already deleted.",
      res.errorStatusCode = 404;
      throw new Error("Data is not found or it is already deleted.");
    }
  },
};
