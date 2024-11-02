const db = require('../../data/db-config');

const checkSchemeId = async (req, res, next) => {
  try {
    const taken = await db('schemes')
      .where('scheme_id', req.params.scheme_id)
      .first();
    if (!taken) {
      res.status(404).json({
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateScheme = (req, res, next) => {
  const scheme_name = req.body.scheme_name;
  if (
    !scheme_name ||
    typeof scheme_name != 'string' ||
    scheme_name.length < 1
  ) {
    res.status(400).json({
      message: 'invalid scheme_name',
    });
  } else next();
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
   
  }
*/

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    step_number < 1 ||
    typeof step_number !== 'number' ||
    instructions === undefined ||
    typeof instructions !== 'string' ||
    !instructions.trim()
  ) {
    res.status(400).json({
      message: 'invalid step',
    });
  } else next();
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
