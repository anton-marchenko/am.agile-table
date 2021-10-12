/** Based on permanent attributes with attributeId in a range [1..100] */
export const PredefinedAttr = {
  Name: 1,
  Description: 2,
} as const;

export const isPredefinedAttr = (attributeId: number) =>
  !!Object.values(PredefinedAttr).find((v) => v === attributeId);
