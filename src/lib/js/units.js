export const units = (field) => {
    if (field === "External Temperature" || field === "Air Temperature") {
        return "°C"
    } else if (field === "Global Irradiance") {
        return "W/m2"
    } else if (field === "Wind Direction") {
        return "°"
    } else if (field === "Wind Speed") {
        return "m/s"
    } else if (field === "Relative Humidity") {
        return "%"
    } else if (field.includes("Voltage")) {
        return "V"
    } else if (field.includes("Current")) {
        return "A"
    } else if (field === "Generator Frequency") {
        return "Hz"
    } else if (field === "Power Factor") {
        return ""
    } else if (field === "Active Power") {
        return "kW"
    } else if (field === "Reactive Power") {
        return "kVAR"
    }
}