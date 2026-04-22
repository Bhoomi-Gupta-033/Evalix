const JUDGE0_API = "https://ce.judge0.com/submissions";

// 🔁 Replace this mapping
const LANGUAGE_MAP = {
  javascript: 63,
  python: 71,
  java: 62,
};

/**
 * @param {string} language
 * @param {string} code
 */
export async function executeCode(language, code) {
  try {
    const language_id = LANGUAGE_MAP[language];

    if (!language_id) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(
      `${JUDGE0_API}?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: language_id,
        }),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const output = data.stdout || "";
    const stderr = data.stderr || "";
    const compile_output = data.compile_output || "";

    // 🔴 Handle errors properly
    if (stderr || compile_output) {
      return {
        success: false,
        output: output,
        error: stderr || compile_output,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
