"use server"

export async function fetchAllUserPermissions({ userId, page }) {
    const response = await fetch(`http://localhost:5000/permissions/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    let data = await response.json()

    let filteredData = data?.permissions?.filter(
        (permission) =>
            permission.doctor_id == userId &&
            (
                page === "Timeline"
                    ? ["Read only", "Read and write"].includes(permission.scope)
                    : ["Write only", "Read and write"].includes(permission.scope)
            )
    );
    return { data: filteredData }
}