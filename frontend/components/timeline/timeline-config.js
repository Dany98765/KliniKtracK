function colorIndicator(type, subType = "") {
  if (type == 'Action') {
    switch (subType) {
      case "Surgical Operation":
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

export const scales = [
    {
        unit: "month",
        step: 1,
        format: "%F %Y",
    },
    {
        unit: "day",
        step: 1,
        format: "%D %j",
    },
];

export const links = [
    {
        source: "1",
        target: "2",
        type: "s2e" // "e2s" | "s2s" | "e2e" | "s2e",
    },
    {
        source: "3",
        target: "2",
        type: "e2e" // "e2s" | "s2s" | "e2e" | "s2e",
    }
]

export const initialTasks = [
    {
        id: "0",
        title: "Joint Replacement",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
        type: "Action",
        subType: "Surgical Operation",
        doctor: "Mina Fayez",
        start: new Date(2026, 8, 17),
        date: "10-07-2018 → 11-07-2018",
        duration: 1,
        color: colorIndicator("Action", "Surgical Operation"),
        caused: ['Aesthemetic Necrosis', 'Gastrointestinal'],
        solved: ['Joint Disorder']
    },

    {
        id: "1",
        title: "Cortisone Tablets",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
        type: "Action",
        subType: "Tablet",
        start: new Date(2026, 8, 1),
        date: "10-07-2018 → 11-07-2018",
        duration: 10,
        color: colorIndicator("Action", "Tablet"),
        caused: ['Chronic Conditions2', 'Mental Health Conditions2'],
        solved: ['Cardiac Issues2']
    },

    {
        id: "2",
        title: "Avascular Necrosis",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
        type: "Condition",
        subType: "Joint Disorder",
        tags: ['joint pain', 'stifness', 'difficulty walking'],
        start: new Date(2026, 8, 1),
        date: "10-07-2018 → 11-07-2018",
        duration: 15,
        color: colorIndicator("Condition"),
        caused: ['Item 1', 'Item 2', 'Item 3'],
        wasSolved: ['Item 4', 'Item 5'] 
    },

    {
        id: "3",
        title: "Diabetes Type 2",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
        type: "Action",
        subType: "Genetic",
        tags: ['high blood pressure', 'diabetic coma'],
        start: new Date(2026, 8, 15),
        date: "10-07-2018 → 11-07-2018",
        duration: 15,
        color: colorIndicator("Action", "Genetic"),
        caused: ['Chronic Conditions', 'Mental Health Conditions'],
        solved: ['Cardiac Issues']
    },
];