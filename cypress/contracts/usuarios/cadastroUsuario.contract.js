import Joi from "joi";

const cadastrarUsuarioSchema = Joi.object({
  nome: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string(),
  administrador: Joi.boolean(),
});

export default cadastrarUsuarioSchema;
