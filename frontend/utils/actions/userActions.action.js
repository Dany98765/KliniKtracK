"use server"

export async function fetchAllActions({ userId }) {
    let initialTasks = [];
    const response = await fetch(`http://localhost:5000/actions/${userId}`, {
        method: "GET",
        next: { revalidate: 60 }
    })
    const data = await response.json()
    if (response.status == 200) {
        data?.actions?.map(({ name, description, start_date, end_date, doctor, doctor_id, type }, id) => {
            initialTasks.push({
                // id,
                title: name,
                // desc: description,
                // type: "Action",
                // subType: type,
                doctor,
                // doctorId: doctor_id, // <- new
                // start: start_date,
                // date: `${start_date.toLocaleDateString()} → ${end_date.toLocaleDateString()}`,
                // duration: (start_date - end_date) / (1000 * 60 * 60 * 24),
                // color: colorIndicator("Action", type),
                // caused: [],
                // solved: []
            })
        })
        console.log(initialTasks + "INITIAL _ TASKS!!!!!!!!!!!!!!!")
        return { initialTasks }
    } else {
        return { data }
    }
}