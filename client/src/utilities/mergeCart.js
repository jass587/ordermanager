export const mergeCarts = (dbCart = [], guestCart = []) => {
  const mergedMap = new Map();

  // Add DB cart items first
  for (const item of dbCart) {
    if (item.productId && item.quantity) {
      mergedMap.set(item.productId, {
        ...item,
        quantity: Number(item.quantity),
      });
    }
  }

  // Merge/append guest cart items
  for (const guestItem of guestCart) {
    if (!guestItem.productId || !guestItem.quantity || !guestItem.productInfo) continue;

    if (mergedMap.has(guestItem.productId)) {
      const existing = mergedMap.get(guestItem.productId);
      mergedMap.set(guestItem.productId, {
        ...existing,
        quantity: existing.quantity + guestItem.quantity,
      });
    } else {
      mergedMap.set(guestItem.productId, {
        ...guestItem,
        quantity: Number(guestItem.quantity),
      });
    }
  }

  return Array.from(mergedMap.values());
};
