//////////////////////////////
//////////////////////////////
///// VALIDATION

export interface LoginReturn {
  id: number
  token: string
  type: number
}

export const validation = {
  login: (username: string, password: string) => ({
    endpoint: "/Validation/login",
    method: "POST",
    body: JSON.stringify({ username, password }),
  }),
}

//////////////////////////////
//////////////////////////////
///// USER

export enum UserRole {
  Manager = 0,
  Employee = 1,
}

export const UserType = {
  Manager: 0,
  Employee: 1,
}

export const UserTypeFa: Record<number, string> = {
  0: "مدیر",
  1: "کارمند",
}

export interface PasswordConfirmation {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UserBase {
  fullName: string
  username: string
  profileImageUrl: string | null
  email: string
  type: UserRole
}

export interface UsersItem {
  id: number
  fullName: string
  userName: string
  userType: UserRole
  profileImageUrl: string | null
}

export enum UserPresenceState {
  NotPresent = 0,
  Present = 1,
  Absent = 2,
  AbsentAndNotPlanned = 411,
}

export interface PresentUsersItem {
  id: number
  fullName: string
  userName: string
  userType: UserRole
  profileImageUrl: string | null
  presenceUersCode: UserPresenceState
}

export interface UserWithID extends UserBase {
  id: number
}

export interface UserInfoTask {
  id: number
  title: string
  description: string | null
  dueDate: string
  priority: TaskPriorityNo
  receiver: string | null
  checker: string | null
  projectName: string | null
  statusTaskID: number
  order: number
  projectID: number
}

export interface UserInfo {
  createDate: string
  email: string
  fullName: string
  id: number
  isVisible: true
  lastModified: string | null
  maxWrongPass: unknown[]
  password: string
  profileImageUrl: string | null
  // TODO
  projects: Array<{ id: number; name: string }>
  rewards: unknown[]
  tasksReceived: UserInfoTask[]
  tasksSent: UserInfoTask[]
  type: number
  username: string
  wrongPass: unknown[]
}

export const user = {
  register: (user: UserBase) => ({
    endpoint: "/User/UserRegistration",
    method: "POST",
    body: JSON.stringify(user),
  }),

  all: () => ({
    endpoint: "/User/GiveUsers",
  }),

  one: (id: number) => ({
    endpoint: `/User/GetUserInfo${id}`,
  }),

  presence: () => ({
    endpoint: "/User/PresenceUsers",
  }),

  edit: (id: number, user: UserBase) => ({
    endpoint: `/User/PutUser${id}?userId=${id}`,
    method: "PUT",
    body: JSON.stringify(user),
  }),

  changeProfile: (urlImg?: string) => ({
    endpoint: "/User/SetProfileImage",
    method: "PUT",
    queryParams: urlImg ? { UrlImage: urlImg } : undefined,
  }),

  changePassword: (pwConfig: PasswordConfirmation) => ({
    endpoint: "/User/ChangePassword",
    method: "PUT",
    body: JSON.stringify(pwConfig),
  }),

  remove: (id: number) => ({
    endpoint: `/User/DeleteUser?userId=${id}`,
    method: "DELETE",
  }),
}

//////////////////////////////
//////////////////////////////
///// DAY REPORT

export interface EditReport {
  reportTitle: string
  reportDescription: string | null
  usefullHour: string | null
  missPresence: string | null
}

export interface DayReport {
  id: number
  enterWork_1: string | null
  exitWork_1: string | null
  enterWork_2: string | null
  exitWork_2: string | null
  missPresence: string | null
  attTime: string | null
  date: "1403-08-24"
  createDate: string
  reportTitle: string
  reportDescription: string | null
  usefulHour: string | null
}

export const dayReport = {
  rollCall: () => ({
    endpoint: "/DayReport/RegisterWorkingHours",
    method: "POST",
  }),

  all: (page = 1, length = 30) => ({
    endpoint: "/DayReport/dayEvents",
    queryParams: {
      range: page,
      setRange: length,
    },
  }),

  forAdmin: (userID: number, page = 1, length = 30) => ({
    endpoint: "/DayReport/ForAdmin",
    queryParams: {
      userID,
      range: page,
      setRange: length,
    },
  }),

  edit: (id: number, report: EditReport) => ({
    endpoint: `/DayReport/putReportDate${id}`,
    method: "PUT",
    body: JSON.stringify(report),
  }),
}

//////////////////////////////
//////////////////////////////
///// WEEKLY SCHEDULE

export interface Schedule {
  startDayOfWeek: string
  dayOfWeek: number
  halfHour: boolean[]
}

export interface ScheduleFull {
  userID: number
  user: null
  startDayOfWeek: string
  dayOfWeek: number
  halfHour: boolean[]
  id: number
  isVisible: boolean
  createDate: string | null
  lastModified: string | null
}

export const weeklySchedule = {
  create: (schedules: Schedule[]) => ({
    endpoint: "/WeeklySchedule/WeeklySchedule",
    method: "POST",
    body: JSON.stringify(schedules),
  }),

  all: (StartDayOfWeek: string) => ({
    endpoint: "/WeeklySchedule/ReadWeeklySchedules",
    queryParams: { StartDayOfWeek },
  }),

  byMonth: (StartDayOfWeek: string) => ({
    endpoint: "/WeeklySchedule/WeeklyScheduleByMounth",
    queryParams: { StartDayOfWeek },
  }),

  forAdmin: (userID: number, StartDayOfWeek: string) => ({
    endpoint: "/WeeklySchedule/ForAdmin",
    queryParams: { userID, StartDayOfWeek },
  }),

  remove: (id: number) => ({
    endpoint: `/WeeklySchedule/DeleteWeeklySchedule?Id=${id}`,
    method: "PUT", // which is supposed to be "DELETE"
  }),
}

//////////////////////////////
//////////////////////////////
///// LEAVE

export interface LeaveRequest {
  from: string
  id: number
  requestStatus: LeaveRequestStatus
  to: string
  user: UsersItem
  userID: number
  causeOfLeave: string | null
}

export interface LeaveRequestPartial {
  hourly: boolean
  from: string
  to: string
  causeOfLeave: string | null
}

export enum LeaveRequestStatus {
  Unknown = 0,
  Accepted = 1,
  Rejected = 2,
}

export const leave = {
  request: (request: LeaveRequestPartial) => ({
    endpoint: "/Leave/Leave",
    method: "POST",
    body: JSON.stringify(request),
  }),

  all: (
    UserID?: number,
    page = 1,
    limit = 100,
  ): {
    endpoint: string
    queryParams: Record<string, string | number>
  } => ({
    endpoint: "/Leave/Leave",
    queryParams: UserID ? { UserID, page, limit } : { page, limit },
  }),

  accept: (id: number, isAccepted: boolean) => ({
    endpoint: `/Leave/Leave${id}`,
    method: "PUT",
    queryParams: {
      status: isAccepted ? LeaveRequestStatus.Accepted : LeaveRequestStatus.Rejected,
    },
  }),
}

//////////////////////////////
//////////////////////////////
///// REWARD

export interface AwardingContract {
  mTemplateRewardID: number
  userID: number
  giverID: number
  discription: string | null
  // TEMP: TEK
  overtime: string
}

export interface Reward {
  createDate: string
  discription: string | null
  giver: unknown | null
  giverID: number
  id: number
  isVisible: boolean
  lastModified: string | null
  mTemplateReward: unknown | null
  mTemplateRewardID: number
  user: unknown | null
  userID: number
  // TEMP: TEK
  overtime: string
}

export const reward = {
  award: (userID: number, contract: AwardingContract) => ({
    endpoint: `/Reward/Awarding${userID}`,
    method: "POST",
    body: JSON.stringify(contract),
  }),

  all: (page = 1, Limit = 100) => ({
    endpoint: "/Reward/GettingRewards",
    queryParams: { page, Limit },
  }),
}

//////////////////////////////
//////////////////////////////
///// TEMPLATE REWARD

export interface RewardTemplatePartial {
  name: string
  pictureUrl: string | null
  description: string | null
  price: number
}

export interface RewardTemplate {
  createDate: string
  description: string | null
  id: number
  isVisible: boolean
  lastModified: string | null
  name: string
  pictureUrl: string | null
  price: number
}

export const templateReward = {
  create: (template: RewardTemplatePartial) => ({
    endpoint: "/TemplateReward/TemplateReward",
    method: "POST",
    body: JSON.stringify(template),
  }),

  all: (page = 1, limit = 100) => ({
    endpoint: "/TemplateReward/GettingTemplateReward",
    queryParams: { page, limit },
  }),

  edit: (id: number, template: RewardTemplatePartial) => ({
    endpoint: `/TemplateReward/EditTemplateReward${id}`,
    method: "PUT",
    body: JSON.stringify(template),
  }),
}

//////////////////////////////
//////////////////////////////
///// NOTIFICAITONS

export interface NotifPartial {
  attachFile: string | null
  dateInvalidity: string | null
  dateReceive: string
  discription: string | null
  senderID: number
  title: string
}

export interface NotifPartialWId extends NotifPartial {
  id: number
}

export const notification = {
  send: (notif: NotifPartial) => ({
    endpoint: "/Notification/SubmitNotification",
    method: "POST",
    body: JSON.stringify(notif),
  }),

  all: (page = 1, limmit = 100) => ({
    endpoint: "/Notification/GettingNotification",
    queryParams: { page, limmit },
  }),

  edit: (NotifID: number, notif: NotifPartial) => ({
    endpoint: "/Notification/Notification",
    body: JSON.stringify(notif),
    method: "PUT",
    queryParams: { NotifID },
  }),

  remove: (notifID: number) => ({
    endpoint: "/Notification/Notification",
    method: "DELETE",
    queryParams: { notifID },
  }),
}

//////////////////////////////
//////////////////////////////
///// PROJECTS

export enum ProjectState {
  NotStarted = 1,
  Active = 2,
  Done = 3,
  Cancelled = 4,
  Completed = 5,
}

export const ProjectStateFa: {
  [x: number]: string
} = {
  1: "شروع نشده",
  2: "شروع شده",
  3: "انجام شده",
  4: "کنسل شده",
  5: "تمام شده",
}

export interface Project {
  color: string
  // createDate: string
  description: string
  employerName: string
  endDate: string
  id: number
  // isVisible: boolean
  // lastModified: string
  name: string
  // progress: number
  startDate: string
  state: number
  urlImage: string | null
  // statusProject: string
  users: Array<UsersItem & { tasks: null | [] }>
}

export interface ProjectPartial {
  name: string
  description: string
  employerName: string
  startDate: string
  endDate: string
  color: string
  state: number
  urlImage: string | null
}

export interface ProjectWithId extends Omit<ProjectPartial, "startDate"> {
  id: number
}

export interface ProjectNDevRelation {
  userID: number
  projectID: number
}

export const project = {
  create: (project: ProjectPartial) => ({
    endpoint: "/Project/CreateProject",
    method: "POST",
    body: JSON.stringify(project),
  }),

  assignDev: (relation: ProjectNDevRelation) => ({
    endpoint: "/Project/AssignDeveloperToProject",
    method: "POST",
    body: JSON.stringify(relation),
  }),

  all: () => ({
    endpoint: "/Project/Projects",
  }),

  one: (projectID: number) => ({
    endpoint: "/Project/ProjectInfo",
    queryParams: { projectID },
  }),

  edit: (id: number, project: ProjectPartial) => ({
    endpoint: `/Project/EditProject${id}`,
    method: "PUT",
    body: JSON.stringify(project),
  }),

  remove: (id: number) => ({
    endpoint: `/Project/DeleteProject?ProjectId=${id}`,
    method: "DELETE",
  }),
}

//////////////////////////////
//////////////////////////////
///// STATUS TASK

export interface StatusPartial {
  color: string
  order: number
  state: StatusTaskState
  title: string
}

export interface StatusPartialWId extends StatusPartial {
  id: number
}

export interface Status extends StatusPartial {
  createDate: string
  id: number
  isVisible: boolean
  lastModified: string | null
}

export enum StatusTaskState {
  NotStart = 1,
  Active = 2,
  Done = 3,
  Closed = 4,
}

export const statusTaskStateFa: { [x: number]: string } = {
  1: "شروع‌نشده", // creator
  2: "فعال", // programmer ^ & v
  3: "تمام‌شده", // checker v & ^
  4: "بسته‌شده", //
}

export const statusTask = {
  create: (newStatus: StatusPartial) => ({
    endpoint: "/StatusTask/CreateStatusTask",
    method: "POST",
    body: JSON.stringify(newStatus),
  }),

  all: () => ({
    endpoint: "/StatusTask/Tasks",
  }),

  edit: (id: number, editedStatus: StatusPartial) => ({
    endpoint: `/StatusTask/StatusTask${id}`,
    method: "PUT",
    body: JSON.stringify(editedStatus),
  }),

  remove: (id: number) => ({
    endpoint: `/StatusTask/Task?statusTaskID=${id}`,
    method: "DELETE",
  }),
}

//////////////////////////////
//////////////////////////////
///// TASKs

export enum TaskCommands {
  PriorityLow = "priority-low",
  PriorityNormal = "priority-normal",
  PriorityHigh = "priority-high",
  PriorityUrgent = "priority-urgent",
  StatusActive = "status-active",
  StatusDone = "status-done",
  StatusCancelled = "status-cancelled",
  StatusCompleted = "status-completed",
}

export enum TaskPriorityNo {
  Urgent = 1,
  High = 2,
  Normal = 3,
  Low = 4,
}

export const taskPriorityToFa = (priority: number) => {
  if (priority === TaskPriorityNo.Urgent) return "اورژانسی"
  if (priority === TaskPriorityNo.High) return "مهم"
  if (priority === TaskPriorityNo.Normal) return "عادی"
  if (priority === TaskPriorityNo.Low) return "کم"
  return "نامعلوم"
}

export interface TaskMini {
  description: string | null
  id: number
  priority: number
  projectID: number
  statusTaskID: number
  title: string
  receiverID: number | null
  checkerID: number | null
  senderID: number | null
}

export interface TaskPartial extends Omit<TaskMini, "id"> {
  dueDate: string
  order: number
}

export interface TaskFull extends TaskPartial {
  checker: string | null
  completeDate: string | null
  createDate: string
  id: number
  isVisible: boolean
  lastModified: string | null
  project: string | null
  receiver: string | null
  runDate: string | null
  sendDate: string | null
  sender: string | null
  senderID: number
  statusTask: null
}

export const task = {
  create: (task: TaskPartial) => ({
    endpoint: "/Task/CreateTask",
    method: "POST",
    body: JSON.stringify(task),
  }),

  setStatus: (taskID: number, statusTaskID: number) => ({
    endpoint: `/Task/SetStatusTasks${taskID}`,
    method: "POST",
    body: JSON.stringify(statusTaskID),
  }),

  all: (page = 1, length = 100) => ({
    endpoint: `/Task/ReadTasks?rangr=${page}&setRange=${length}`,
  }),

  one: (id: number) => ({
    endpoint: `/Task/ReadTask${id}`,
  }),

  edit: (TaskID: number, editedTask: TaskPartial) => ({
    endpoint: "/Task/EditTask",
    body: JSON.stringify(editedTask),
    method: "POST", // !!
    queryParams: { TaskID },
  }),

  remove: (id: number) => ({
    endpoint: `/Task/RemoveTask${id}`,
    method: "DELETE",
  }),
}

//////////////////////////////
//////////////////////////////
///// COMMENTS

export interface CommentPartial {
  comment: string
  attachFile: string | null
}

export interface Comment {
  id: number
  comment: string
  attachFile: string | null
  dateSend: string
  senderID: number
}

export const comment = {
  send: (taskID: number, comment: CommentPartial) => ({
    endpoint: `/Comment/SendComment${taskID}`,
    body: JSON.stringify(comment),
    method: "POST",
  }),

  all: (taskID: number, page = 1, length = 100) => ({
    endpoint: `/Comment/GetComments?taskId=${taskID}&range=${page}&setRange=${length}`,
  }),

  edit: (commandID: number, comment: CommentPartial) => ({
    endpoint: `/Comment/EditComment${commandID}`,
    method: "PUT",
    body: JSON.stringify(comment),
  }),

  remove: (id: number) => ({
    endpoint: `/Comment/DeleteComment${id}`,
    method: "DELETE",
  }),
}

//////////////////////////////
//////////////////////////////
///// FILES

export interface FileConfig {
  file: File
  name?: string | null
  description?: string | null
  isPrivate: boolean
}

export interface FileResponse {
  id: string | null
  adress: string | null
}

export const file = {
  download: (guid: string) => ({ endpoint: `/File/download/${guid}` }),

  upload: (fileConfig: FileConfig) => {
    const formData = new FormData()

    formData.append("File", fileConfig.file)
    formData.append("Name", fileConfig.name ?? "")
    formData.append("Description", fileConfig.description ?? "")
    formData.append("IsPrivate", fileConfig.isPrivate.toString())

    return {
      endpoint: "/File/upload",
      method: "POST",
      body: formData,
      headersConfig: {
        contentType: false,
        auth: true,
      },
    }
  },
}
