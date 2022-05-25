/**
 * Format a number as a string with spaces between thousands
 *
 * @param num The number to format
 * @returns The number formatted as a string
 */
export const readableNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
