import importlib.util
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "verify_rewrite.py"
SPEC = importlib.util.spec_from_file_location("verify_rewrite", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class VerifyRewriteTests(unittest.TestCase):
    def test_safe_rewrite_passes(self):
        source = 'Amit said "keep it small." The launch may cost $2,400 on 28/07/2026.'
        candidate = 'Amit said "keep it small." On 28/07/2026, the launch may cost $2,400.'
        result = MODULE.verify(source, candidate, required_entities=["Amit"])
        self.assertTrue(result["passed"])
        self.assertEqual(result["critical_issue_count"], 0)

    def test_exact_value_modality_and_polarity_drift_block_release(self):
        source = "The plan may save 12%. It should not ship on 28/07/2026."
        candidate = "The plan will save 15%. It should ship on 29/07/2026."
        result = MODULE.verify(source, candidate)
        codes = {issue["code"] for issue in result["issues"]}
        self.assertFalse(result["passed"])
        self.assertIn("exact_value_drift", codes)
        self.assertIn("modality_drift", codes)
        self.assertIn("polarity_drift", codes)

    def test_unsupported_biography_and_style_leakage_block_release(self):
        source = "Explain why the decision matters to small teams."
        candidate = "I remember working with leaders who made this exact costly mistake."
        sample = "I remember working with leaders who made this exact costly mistake last winter."
        result = MODULE.verify(source, candidate, style_samples=[sample])
        codes = {issue["code"] for issue in result["issues"]}
        self.assertIn("unsupported_biography", codes)
        self.assertIn("style_sample_leakage", codes)


if __name__ == "__main__":
    unittest.main()
