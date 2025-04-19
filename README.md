# Personal Finance Visualizer

A responsive and intuitive web application to track expenses, visualize category-wise spending, and manage budgets. Built using **Next.js**, **React**, **Tailwind CSS**, **shadcn/ui**, **Recharts**, and **MongoDB**.

---

## 🔧 Features

- 📊 Dashboard with total spending, recent transactions, and charts
- 💸 Category-wise expense tracking with pie chart visualization
- 📆 Monthly budgeting and budget vs. actual comparison
- 🔍 Real-time insights into overspending and savings
- 🎨 Clean UI with customizable, responsive components

---

## 🧱 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Database**: MongoDB (with Mongoose ODM)
- **API**: REST API using Next.js API routes
- **Authentication** (Optional): NextAuth.js or JWT-based

---

## 📁 Folder Structure

/app /components └── BudgetCard.tsx └── CategoryPieChart.tsx /lib └── db.ts └── utils.ts /models └── Transaction.ts └── Category.ts └── Budget.ts /api └── transactions/ └── categories/ └── budgets/