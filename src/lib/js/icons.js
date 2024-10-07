export const icons = (field) => {
    if (field === "External Temperature") {
        return "bi-thermometer-half"
    } else if (field === "Global Irradiance") {
        return "bi-sun"
    } else if (field === "Wind Direction") {
        return "bi-arrows-move"
    } else if (field === "Wind Speed") {
        return "bi-wind"
    } else if (field === "Relative Humidity") {
        return "bi-droplet-half"
    }
}