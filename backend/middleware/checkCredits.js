export const checkCredits = async (req, res, next) => {
  try {
    if (COST_PER_GENERATION > req.user.credits) {
      return res.status(402).json({ message: "Insufficient credits." });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error during credit check. Please try again later.",
    });
  }
};
