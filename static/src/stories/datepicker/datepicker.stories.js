/** @odoo-module */

import { DatePicker } from "@web/core/datetime/datetime_picker";
import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
import { getEventFunction } from "../../js/stories";

class DatePickerParent extends Component {
    static template = "owlybook.DatePickerStories";
    static components = { DatePicker };
}

DatePickerParent.codeTemplate = "owlybook.DatePickerCall";
DatePickerParent.storyConfig = {
    title: "DatePicker",
    component: DatePicker,
    props: {
        placeholder: {
            value: "Pick a date ...",
        },
        format: {
            value: "dd/MM/yyyy",
        },
        readonly: {
            value: false,
        },
        onDateTimeChanged: {
            value: getEventFunction("onDateTimeChanged"),
        },
    },
};

export const DatePickerStories = {
    title: "Core components",
    module: "web",
    stories: [DatePickerParent],
};

registry.category("stories").add("owlybook.datepicker", DatePickerStories);
