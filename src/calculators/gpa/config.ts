import type { CalculatorDefinition } from "../types";

export const gpaConfig: CalculatorDefinition = {
  slug: "gpa",
  name: "GPA Calculator",
  summary:
    "Calculate your grade point average on the US 4.0 scale, or your weighted average percentage in Canada.",
  category: "math-education",
  countries: ["us", "ca"],
  formulaSteps: [
    "US: each grade is converted to grade points (A = 4.0, A- = 3.7, B+ = 3.3, and so on, down to F = 0.0).",
    "US GPA = (grade points × credit hours, added up for every course) ÷ total credit hours.",
    "Canada: each percentage is multiplied by its credit hours, added up, and divided by the total credit hours.",
    "The Canadian result is a percentage average. It is not converted to a GPA.",
  ],
  workedExample:
    "In the US system, a course with an A (4.0) worth 3 credit hours and a course with a B (3.0) worth 3 credit hours give a GPA of (12.0 + 9.0) ÷ 6 = 3.50. In the Canadian system, a course at 90% worth 4 credit hours and a course at 60% worth 2 credit hours give (360 + 120) ÷ 6 = 80%.",
  limitations: [
    "The US figures use the standard 4.0 scale. Some schools award different points, for example A+ as 4.3, or use weighted scales for honours and AP courses.",
    "Canadian schools differ in how they convert percentages to grade points, so the calculator reports a percentage average only.",
    "Grades are averaged as entered. Courses marked pass/fail, withdrawn, or in progress should be left out.",
    "Your school's official transcript or grade report is the authority for your GPA.",
  ],
  faqs: [
    {
      question: "How many courses can I enter?",
      answer:
        "Six rows are available. Leave any row you do not need blank, and blank rows are ignored.",
    },
    {
      question: "What are credit hours?",
      answer:
        "Credit hours (sometimes called units or credits) show how much a course counts toward your total. Use the value on your course outline or transcript. A course worth more credit hours has more weight in the average.",
    },
    {
      question: "Why does the Canadian result not show a GPA?",
      answer:
        "Canadian universities and colleges use different conversion scales. A percentage converted to a GPA would depend on your school, so the calculator avoids guessing. Check your school's grading policy if you need a GPA.",
    },
    {
      question: "Is this the same as my cumulative GPA?",
      answer:
        "Only if the courses you enter are all the courses your cumulative GPA counts. Many schools exclude some courses, so compare the result with your transcript.",
    },
  ],
  lastChecked: "2026-11-14",
};