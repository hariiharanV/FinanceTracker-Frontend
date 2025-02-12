
export const FormatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return ''; // Handle undefined or null values

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
        console.error('Invalid ISO date format');
        return '';
    }

    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export default FormatDateToDDMMYYYY