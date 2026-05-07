import PromoCode from "../models/PromoCode.js";

const normalizePromoCode = (code = "") => code.trim().toUpperCase();

export const calculateDiscount = (priceInRupees, promo) => {
  const originalAmount = Math.max(Number(priceInRupees || 0), 0) * 100;

  if (!promo) {
    return {
      originalAmount,
      discountAmount: 0,
      finalAmount: originalAmount,
      promoCode: "",
    };
  }

  const percentDiscount = Math.round(
    (originalAmount * Number(promo.percentOff || 0)) / 100
  );
  const flatDiscount = Math.max(Number(promo.amountOff || 0), 0) * 100;
  const discountAmount = Math.min(originalAmount, percentDiscount + flatDiscount);

  return {
    originalAmount,
    discountAmount,
    finalAmount: Math.max(originalAmount - discountAmount, 0),
    promoCode: promo.code,
  };
};

export const findValidPromoCode = async (code) => {
  const normalizedCode = normalizePromoCode(code);

  if (!normalizedCode) {
    return null;
  }

  const promo = await PromoCode.findOne({ code: normalizedCode });

  if (!promo || !promo.active) {
    return null;
  }

  if (promo.expiresAt && promo.expiresAt < new Date()) {
    return null;
  }

  if (promo.maxUses > 0 && promo.usedCount >= promo.maxUses) {
    return null;
  }

  return promo;
};

export const usePromoCode = async (promo) => {
  if (!promo) return;

  promo.usedCount += 1;
  await promo.save();
};
