const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'AGE', uid: 'age', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'TEAM', uid: 'team' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'SALARY', uid: 'salary' },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
]

const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Paused', uid: 'paused' },
  { name: 'Vacation', uid: 'vacation' },
]

export { columns, statusOptions }
