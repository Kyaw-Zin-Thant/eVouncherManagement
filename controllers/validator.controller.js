const Joi = require("joi");
exports.vouncher = Joi.object().keys({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  expiredDate: Joi.date().required(),
  image: Joi.string().optional(),
  amount: Joi.string().required(),
  paymethod: Joi.string().required(),
  paymethodDiscounts: Joi.array().items(
    Joi.object().keys({
      paymethod: Joi.string(),
      percent: Joi.number(),
    })
  ),
  quantity: Joi.number(),
  buyType: Joi.object({
    type: Joi.string().valid("MYSELF", "GIFT"),
    name: Joi.string(),
    phoneNumber: Joi.string(),
    buyLimit: Joi.number(),
    giftUserLimit: Joi.number(),
  }),
});
