const CALC_KEY = 'calculator::theme';

export const saveTheme = (theme) =>
    localStorage.setItem(CALC_KEY, JSON.stringify({ theme }));

export const readTheme = () => {
    const theme = localStorage.getItem(CALC_KEY);
    return JSON.parse(theme);
};
