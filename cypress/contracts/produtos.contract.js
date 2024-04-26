const Joi = require("joi");

const produtosSchema = Joi.object({
  quantidade: Joi.number(),
  produtos: Joi.array().items({
    nome: Joi.string().min(1).required(),
    preco: Joi.number().greater(0).required(),
    descricao: Joi.string().min(1).required(),
    quantidade: Joi.number().min(1).required(),
    _id: Joi.string().required(),
  }),
});
export default produtosSchema;
