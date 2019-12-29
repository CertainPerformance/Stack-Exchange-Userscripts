export const addThousandsSeparators = (num: number) => String(num).replace(/(?!^)(?=(?:\d{3})+$)/g, ',');
