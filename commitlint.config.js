module.exports = {
  ignores: [(message) => message.includes("WIP")],
  extends: ["@commitlint/config-conventional"],
};
