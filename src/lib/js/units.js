export const units = (field) => {
    if (field === "External Temperature") {
        return "degC"
    } else if (field === "Global Irradiance") {
        return "W/m2"
    } else if (field === "Wind Direction") {
        return "deg"
    } else if (field === "Wind Speed") {
        return "m/s"
    } else {
        return "%"
    }
}