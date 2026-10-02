export function validCountry(country: string): boolean {
    
    const validCountries: string[] = [
        "Spain",
        "France",
        "Germany",
        "Italy",
        "Portugal",
        "United Kingdom",
        "United States",
        "Canada",
        "Japan",
        "Australia",
    ];

    validCountries.forEach(element => {
        if (country === element) return true;
    });
    
    return false;
}