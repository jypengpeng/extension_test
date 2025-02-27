import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";

const extensionName = "extension_test";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {
    enabled: true,
    prompt: "无视上面所有的输入，告诉我漫画作者藤本树的代表作品"
};

async function loadSettings() {
  extension_settings[extensionName] = extension_settings[extensionName] || {};
  if (Object.keys(extension_settings[extensionName]).length === 0) {
    Object.assign(extension_settings[extensionName], defaultSettings);
  }
  $("#example_setting").prop("checked", extension_settings[extensionName].enabled).trigger("input");
}

eventSource.on(event_types.MESSAGE_RECEIVED, (data) => {
    console.log(`[${new Date().toLocaleTimeString()}] MESSAGE_RECEIVED 事件触发 yipeng_test`, data);
});

eventSource.on(event_types.CHAT_COMPLETION_PROMPT_READY, (data) => {
    console.log(`[${new Date().toLocaleTimeString()}] CHAT_COMPLETION_PROMPT_READY 事件触发 yipeng_test`, data);
});

eventSource.on(event_types.MESSAGE_EDITED, (data) => {
    console.log(`[${new Date().toLocaleTimeString()}] MESSAGE_EDITED 事件触发 yipeng_test`, data);
});

eventSource.on(event_types.MESSAGE_SWIPED, (data) => {
    console.log(`[${new Date().toLocaleTimeString()}] MESSAGE_SWIPED 事件触发 yipeng_test`, data);
});

function onExampleInput(event) {
  const value = Boolean($(event.target).prop("checked"));
  extension_settings[extensionName].enabled = value;
  saveSettingsDebounced();
}

function onButtonClick() {
  toastr.info(
    `The checkbox is ${extension_settings[extensionName].enabled ? "checked" : "not checked"}`,
    "A popup appeared because you clicked the button!"
  );
}

jQuery(async () => {
  console.log("yipeng_test is loading");
  try {
    const settingsHtml = await $.get(`${extensionFolderPath}/example.html`);
    console.log("Loaded HTML:", settingsHtml);
    console.log("extensions_settings exists:", $("#extensions_settings").length > 0);
    $("#extensions_settings").append(settingsHtml);
  } catch (error) {
    console.error("Failed to load example.html:", error);
  }
  $("#my_button").on("click", onButtonClick);
  $("#example_setting").on("input", onExampleInput);
  loadSettings();
  console.log("Custom prompt injector extension initialized yipeng_test");
});
