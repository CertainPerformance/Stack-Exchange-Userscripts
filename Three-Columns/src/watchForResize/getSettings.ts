export const getSettings = () => {
    const json = localStorage.cpUserscriptThreeColumnsAdjustable;
    return json
        ? JSON.parse(json as string) as { firstColWidth: number, secondColWidth: number }
        : { firstColWidth: 33.33, secondColWidth: 33.33 };
};
