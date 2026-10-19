"use server"

function colorIndicator(type, subType = "") {
    if (type !== "Action") {
        return "#FFFFFF"
    }

    switch (subType) {
        case "Surgical operation":
            return "#A411D9"
        case "Tablet":
            return "#23BAE7"
        case "Genetic":
            return "#DDDDDD"
        default:
            return "#434345"
    }
}

function formatDate(date) {
    return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC"
    })
}

export async function fetchAllActionsAndConditions({ userId }) {
    const fetchAllActionsRes = await fetch(`http://localhost:5000/actions/${userId}`, {
        method: "GET",
        next: { revalidate: 60 }
    })
    if (!fetchAllActionsRes.ok) {
        throw new Error(`Failed to fetch actions: ${fetchAllActionsRes.status}`)
    }
    const fetchAllActionsData = await fetchAllActionsRes.json()
    const initialTasks = (fetchAllActionsData.actions ?? []).map(({ name, description, start_date, end_date, doctor, doctor_id, type }, id) => {
        const start = new Date(start_date)
        const end = new Date(end_date)
        const startDateStr = formatDate(start)
        const endDateStr = formatDate(end)
        return {
            DBRecordID: id,
            id: `action-${id}`,
            title: name ?? "",
            desc: description ?? "",
            type: "Action",
            subType: type ?? "",
            doctor: doctor ?? "",
            doctorId: doctor_id ?? null,
            start: start.toISOString(),
            date: `${startDateStr} → ${endDateStr}`,
            duration: Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24) + 1)),
            color: colorIndicator("Action", type),
            caused: [],
            solved: []
        }
    })

    const fetchAllConditionsRes = await fetch(`http://localhost:5000/conditions/${userId}`, {
        method: "GET",
        next: { revalidate: 60 }
    })
    if (!fetchAllConditionsRes.ok) {
        throw new Error(`Failed to fetch conditions: ${fetchAllConditionsRes.status}`)
    }
    const fetchAllConditionsData = await fetchAllConditionsRes.json()
    const allConditions = (fetchAllConditionsData.conditions ?? []).map(({ name, description, start_date, end_date, symptoms, type }, id) => {
        const start = new Date(start_date)
        const end = new Date(end_date)
        const startDateStr = formatDate(start)
        const endDateStr = formatDate(end)
        return {
            DBRecordID: id,
            id: `condition-${id}`,
            title: name ?? "",
            desc: description ?? "",
            type: "Condition",
            subType: type ?? "",
            start: start.toISOString(),
            date: `${startDateStr} → ${endDateStr}`,
            duration: Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24))) + 1,
            color: colorIndicator("Condition"),
            symptoms: Array.isArray(symptoms) ? symptoms : [],
            caused: [],
            solved: []
        }
    })

    return { initialTasks, allConditions }
}
