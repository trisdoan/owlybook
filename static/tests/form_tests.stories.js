/** @odoo-module */

const serverData = {
    models: {
        order: {
            fields: {
                image_url: { string: "Image", type: "char" },
                description: { string: "Description", type: "char" },
            },
            records: [
                {
                    id: 1,
                    image_url: "",
                    description: "A nice description",
                },
                {
                    id: 2,
                    image_url: "",
                    description: "A second nice description",
                },
            ],
        },
    },
    views: {},
};

const formExample = {
    title: "Form example",
    model: "order",
    viewType: "form",
    arch: `<form><sheet><group><field name="description"/><field name="image_url"/></group></sheet></form>`,
    serverData,
};

export const FormStories = {
    title: "Form",
    module: "web",
    stories: [formExample],
};