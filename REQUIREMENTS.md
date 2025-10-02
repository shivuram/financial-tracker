# TODO

- DashBoard Page
- Transactions Page - Create, Edit, Read, Delete transactions data
  - Filter, Search, Sorting
- Display total income, total expenses and available balances
- Generate Lighthouse for performance report
- Form Validations

# Coding

- Javascript
  - Algorithimic like DSA
  - Non Alogrithimic
- React JS

# MCQ / QA

- HTML CSS
- Javascript
- React

# Job

- Linkedin Networking
- LinkedIn Apply

# System Desgin

# Job Portal - Application

1. Fetch Jobs with Pagination
   `GET /jobs?page=<page>&limit=<limit>`

- By default, display the first page with a limit of 10 jobs.
- Show Next and Previous buttons to navigate pages.
- Disable "Previous" on the first page and "Next" on the last page.
- http://localhost:5000/jobs?\_page=2&\_limit=10

2. Search Jobs

   - Add a search bar.
   - When user enters text and clicks `“Search”`:
     - Fetch jobs again using search query param. `GET /jobs?page=1&limit=10&search=react`
     - Reset pagination back to page 1.
   - Reset - fetch all jobs (like initial).

3. Add Jobs

   - Form with title, company, location
   - After post the job, refetch the data again

4. Others
   - Error Popup
   - Show loading indicator while fetching
   - If API returns empty array, show No Jobs Found Message in UI

# AutoComplete Search Bar

1. Fetch the data, display on screen
2. Implement basic search functionality - Build a search input that queries an API
3. Show hide search results on focus and blur
4. Improve performance with debouncing and caching - Implement debouncing and caching so repeated queries return cached results instead of making a new API call.

## Learnings

1. When fetch did't throw error and when catch blocks catches error
2. Event Handlers Calling
3. In JavaScript an empty array [] is truthy
4. Arrow Function inside JSX ----> ✅ no return keyword needed, using () ✅ must return kewyord because of {}
5. Advantages of cleanup function inside useEffect
6. How key in lists helps in react virtual DOM
7. Adding dynamic properties in an object

   ```jsx
     const [cache, setCache] = useState<Record<string, Result[]>>({});

   setCache((prev) => {
        return { ...prev, [input]: data?.products }; // [input] is a computed property name
        // Evaluate the value of the variable input and use it as the property key.”
      });

   // if input ="phone"
   {
   ...prev,
   phone: data?.products   // ✅ dynamic key
   }
   // This is how you add dynamic properties to an object
   ```

   - Example in vanilla JS

   ```js
   const key = "foo";
   const obj1 = { key: 123 }; // ❌ adds property literally "key"
   console.log(obj1); // { key: 123 }

   const obj2 = { [key]: 123 }; // ✅ evaluates key variable
   console.log(obj2); // { foo: 123 }
   ```
