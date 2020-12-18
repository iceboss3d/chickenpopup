const toNaira = (amount: number): string => {
    return amount.toLocaleString("en-NG", {style: "currency", currency: "NGN"})
}

export {toNaira}