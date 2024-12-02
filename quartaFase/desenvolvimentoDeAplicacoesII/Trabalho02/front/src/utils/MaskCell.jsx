export const mphone = (value) => {
    if (!value) return value;
    const onlyNumbers = value.replace(/\D/g, '');

    if (onlyNumbers.length <= 10) {
        return onlyNumbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    }
    return onlyNumbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
};
