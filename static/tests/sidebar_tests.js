/** @odoo-module **/

import { click, getFixture, editInput, nextTick } from "@web/../tests/helpers/utils";
import { CheckBoxStories, CheckBoxStories2 } from "./checkbox_tests.stories";
import { cleanStoriesRegistry, setupPlaygroundRegistries, makePlaygroundView } from "./utils";

let target;

QUnit.module("UI Playground", (hooks) => {
    hooks.beforeEach(async () => {
        target = getFixture();
        cleanStoriesRegistry();
        setupPlaygroundRegistries();
    });

    QUnit.module("Sidebar");

    QUnit.test("Sidebar correctly shows the stories hierarchy", async (assert) => {
        await makePlaygroundView(target, {
            checkbox: CheckBoxStories,
        });

        assert.containsN(target, ".o_ui_playground_module", 1);

        assert.strictEqual(
            target.querySelector(".o_ui_playground_module").textContent,
            "web",
            "web should be the first module"
        );

        // two "folders", one for the introduction and one for checkbox
        assert.containsN(target, ".o_ui_playground_folder", 2);

        assert.strictEqual(
            target.querySelectorAll(".o_ui_playground_folder")[0].textContent,
            "Introduction",
            "Introduction should be the first folder"
        );

        assert.strictEqual(
            target.querySelectorAll(".o_ui_playground_folder")[1].textContent,
            "Checkbox",
            "Checkbox should be the second folder"
        );

        assert.containsN(target, ".o_ui_playground_item", 2);

        assert.strictEqual(
            target.querySelector(".o_ui_playground_item").textContent,
            "CheckboxFirstStory",
            "CheckboxFirstStory should be the first story"
        );

        assert.strictEqual(
            target.querySelectorAll(".o_ui_playground_item:first-child")[1].textContent,
            "CheckboxSecondStory",
            "CheckboxSecondStory should be the second story"
        );
    });

    QUnit.test("Clicking on a folder fold/unfold it", async (assert) => {
        await makePlaygroundView(target, {
            checkbox: CheckBoxStories,
        });

        assert.containsN(target, ".o_ui_playground_item", 2);

        // fold
        await click(target.querySelectorAll(".o_ui_playground_folder")[1]);
        assert.containsN(target, ".o_ui_playground_item", 0);

        // unfold
        await click(target.querySelectorAll(".o_ui_playground_folder")[1]);
        assert.containsN(target, ".o_ui_playground_item", 2);
    });

    QUnit.test("Clicking on a module fold/unfold it", async (assert) => {
        await makePlaygroundView(target, {
            checkbox: CheckBoxStories,
        });

        assert.containsN(target, ".o_ui_playground_item", 2);
        assert.containsN(target, ".o_ui_playground_folder", 2);

        // fold
        await click(target.querySelector(".o_ui_playground_module"));
        assert.containsN(target, ".o_ui_playground_item", 0);
        assert.containsN(target, ".o_ui_playground_folder", 1);

        // unfold
        await click(target.querySelector(".o_ui_playground_module"));
        assert.containsN(target, ".o_ui_playground_item", 2);
        assert.containsN(target, ".o_ui_playground_folder", 2);
    });

    QUnit.test("Searchbar is filtering stories", async (assert) => {
        await makePlaygroundView(target, {
            checkbox: CheckBoxStories,
            checkboxTwo: CheckBoxStories2,
        });

        assert.containsOnce(target, ".o_searchview_input");
        assert.containsN(target, ".o_ui_playground_item", 3);
        assert.containsN(target, ".o_ui_playground_folder", 3);

        editInput(target, "input.o_searchview_input", "F");
        await nextTick();

        assert.containsOnce(target, ".o_searchview_input");
        assert.containsN(target, ".o_ui_playground_item", 1);
        assert.containsN(target, ".o_ui_playground_folder", 2);

        assert.strictEqual(
            target.querySelector(".o_ui_playground_item").textContent,
            "CheckboxFirstStory",
            "CheckboxFirstStory should be the only one displayed"
        );
        //TODO: Test module number when they are filtered
    });
});