"use server"

function colorIndicator(type, subType = "") {
    if (type == 'Action') {
        switch (subType) {
            case "Surgical operation":
                return "#A411D9"
            case "Tablet":
                return "#23BAE7"
            case "Genetic":
                return "#DDDDDD"
        }
    } else {
        return "#FFFFFF"
    }
}

export async function fetchAllActionsAndConditions({ userId }) {
    let initialTasks = [];
    const fetchAllActionsRes = await fetch(`http://localhost:5000/actions/${userId}`, {
        method: "GET",
        next: { revalidate: 60 }
    })
    const fetchAllActionsData = await fetchAllActionsRes.json()
    if (fetchAllActionsRes.status == 200) {
        fetchAllActionsData?.actions?.forEach(({ name, description, start_date, end_date, doctor, doctor_id, type }, id) => {
            let start = new Date(start_date)
            const startDateStr = start.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: "UTC"
            });
            let end = new Date(end_date)
            const endDateStr = end.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: "UTC"
            });
            console.log(startDateStr, endDateStr + "--")
            let duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24) + 1);
            initialTasks.push({
                id,
                title: name,
                desc: description,
                type: "Action",
                subType: type,
                doctor,
                doctorId: doctor_id,
                start: start.toISOString(),
                date: `${startDateStr} → ${endDateStr}`,
                duration,
                color: colorIndicator("Action", type),
                caused: [],
                solved: []
            })
        })
        let allConditions = [];
        const fetchAllConditionsRes = await fetch(`http://localhost:5000/conditions/${userId}`, {
            method: "GET",
            next: { revalidate: 60 }
        })
        const fetchAllConditionsData = await fetchAllConditionsRes.json()
        if (fetchAllConditionsRes.status == 200) {
            fetchAllConditionsData?.conditions?.forEach(({ name, description, start_date, end_date, symptoms, type }, id) => {
                let start = new Date(start_date)
                const startDateStr = start.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: "UTC"
                });
                let end = new Date(end_date)
                const endDateStr = end.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: "UTC"
                });
                let duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24) + 1);
                allConditions.push({
                    id: id + initialTasks.length,
                    title: name,
                    desc: description,
                    type: "Condition",
                    subType: type,
                    start: start.toISOString(),
                    date: `${startDateStr} → ${endDateStr}`,
                    duration,
                    color: colorIndicator("Condition"),
                    symptoms,
                    caused: [],
                    solved: []
                })
            })
            return { initialTasks: JSON.parse(JSON.stringify(initialTasks)), allConditions: JSON.parse(JSON.stringify(allConditions)) }
        } else {
            return { data }
        }
    }
}
