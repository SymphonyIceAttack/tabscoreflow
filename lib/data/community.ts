import type { Challenge, ForumPost, Comment } from "@/lib/types"

// 模拟学习挑战数据
export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "30天基础和弦挑战",
    description: "每天学习一个新和弦，30天掌握所有基础和弦",
    type: "daily",
    startDate: "2024-03-01",
    endDate: "2024-03-30",
    participants: 1234,
    tasks: [
      { day: 1, task: "学习 C 大三和弦", completed: true },
      { day: 2, task: "学习 G 大三和弦", completed: true },
      { day: 3, task: "学习 D 大三和弦", completed: true },
      { day: 4, task: "学习 Am 小三和弦", completed: false },
      { day: 5, task: "学习 Em 小三和弦", completed: false },
    ],
    rewards: {
      experience: 500,
      badge: "chord-challenger",
    },
  },
  {
    id: "challenge-2",
    title: "五声音阶精通",
    description: "掌握五个把位的五声音阶，成为即兴高手",
    type: "weekly",
    startDate: "2024-03-01",
    endDate: "2024-03-28",
    participants: 856,
    tasks: [
      { day: 1, task: "第一把位", completed: true },
      { day: 7, task: "第二把位", completed: false },
      { day: 14, task: "第三把位", completed: false },
      { day: 21, task: "第四把位", completed: false },
      { day: 28, task: "第五把位", completed: false },
    ],
    rewards: {
      experience: 800,
      badge: "scale-master",
    },
  },
  {
    id: "challenge-3",
    title: "速弹入门",
    description: "从60BPM到120BPM，逐步提升你的演奏速度",
    type: "weekly",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    participants: 567,
    tasks: [
      { day: 1, task: "60 BPM 稳定演奏", completed: false },
      { day: 7, task: "80 BPM 稳定演奏", completed: false },
      { day: 14, task: "100 BPM 稳定演奏", completed: false },
      { day: 21, task: "120 BPM 稳定演奏", completed: false },
    ],
    rewards: {
      experience: 1000,
      badge: "speed-demon",
    },
  },
]

// 模拟排行榜数据
export const leaderboard = [
  { rank: 1, userId: "user-1", username: "吉他大神", avatar: "", totalPracticeTime: 15680, level: 42, streak: 120 },
  { rank: 2, userId: "user-2", username: "音乐漫步者", avatar: "", totalPracticeTime: 12450, level: 38, streak: 89 },
  { rank: 3, userId: "user-3", username: "指尖舞者", avatar: "", totalPracticeTime: 10230, level: 35, streak: 67 },
  { rank: 4, userId: "user-4", username: "弦上行者", avatar: "", totalPracticeTime: 8900, level: 32, streak: 45 },
  { rank: 5, userId: "user-5", username: "旋律猎人", avatar: "", totalPracticeTime: 7650, level: 29, streak: 38 },
  { rank: 6, userId: "user-6", username: "和弦收藏家", avatar: "", totalPracticeTime: 6800, level: 27, streak: 30 },
  { rank: 7, userId: "user-7", username: "节奏大师", avatar: "", totalPracticeTime: 5900, level: 25, streak: 25 },
  { rank: 8, userId: "user-8", username: "音阶探险家", avatar: "", totalPracticeTime: 5200, level: 23, streak: 20 },
  { rank: 9, userId: "user-9", username: "六弦侠客", avatar: "", totalPracticeTime: 4500, level: 21, streak: 15 },
  { rank: 10, userId: "user-10", username: "吉他新手", avatar: "", totalPracticeTime: 3800, level: 19, streak: 10 },
]

// 模拟论坛帖子
export const forumPosts: ForumPost[] = [
  {
    id: "post-1",
    title: "新手求助：如何快速转换和弦？",
    content: "我刚开始学吉他三个月，C和弦到G和弦的转换总是很慢，有什么好的练习方法吗？",
    author: {
      id: "user-11",
      username: "吉他萌新",
      avatar: "",
      level: 5,
    },
    category: "求助",
    tags: ["新手", "和弦", "技巧"],
    createdAt: "2024-03-10T10:30:00Z",
    updatedAt: "2024-03-10T10:30:00Z",
    views: 234,
    likes: 15,
    commentsCount: 8,
    isPinned: false,
  },
  {
    id: "post-2",
    title: "分享：我的吉他学习一年心得",
    content: "从零基础到能弹唱十几首歌，分享我这一年的学习经验和走过的弯路...",
    author: {
      id: "user-12",
      username: "音乐追梦人",
      avatar: "",
      level: 18,
    },
    category: "经验分享",
    tags: ["心得", "进阶", "自学"],
    createdAt: "2024-03-09T15:20:00Z",
    updatedAt: "2024-03-09T15:20:00Z",
    views: 567,
    likes: 89,
    commentsCount: 23,
    isPinned: true,
  },
  {
    id: "post-3",
    title: "讨论：电吉他和木吉他哪个更适合入门？",
    content: "想开始学吉他，但是不知道应该选电吉他还是木吉他，大家有什么建议？",
    author: {
      id: "user-13",
      username: "选择困难症",
      avatar: "",
      level: 1,
    },
    category: "讨论",
    tags: ["入门", "设备", "选择"],
    createdAt: "2024-03-08T09:15:00Z",
    updatedAt: "2024-03-08T14:30:00Z",
    views: 432,
    likes: 28,
    commentsCount: 45,
    isPinned: false,
  },
  {
    id: "post-4",
    title: "练习技巧：如何提高扫弦的节奏感",
    content: "很多人扫弦的时候节奏不稳，今天分享几个我常用的练习方法...",
    author: {
      id: "user-2",
      username: "音乐漫步者",
      avatar: "",
      level: 38,
    },
    category: "教程",
    tags: ["扫弦", "节奏", "技巧"],
    createdAt: "2024-03-07T20:00:00Z",
    updatedAt: "2024-03-07T20:00:00Z",
    views: 789,
    likes: 156,
    commentsCount: 34,
    isPinned: true,
  },
  {
    id: "post-5",
    title: "求推荐：适合新手练习的流行歌曲",
    content: "学了基本的C、G、Am、Em四个和弦，想找一些简单的歌练习，大家有推荐吗？",
    author: {
      id: "user-14",
      username: "流行乐爱好者",
      avatar: "",
      level: 8,
    },
    category: "求助",
    tags: ["新手", "流行", "推荐"],
    createdAt: "2024-03-06T16:45:00Z",
    updatedAt: "2024-03-06T16:45:00Z",
    views: 345,
    likes: 42,
    commentsCount: 28,
    isPinned: false,
  },
]

// 模拟评论
export const comments: Comment[] = [
  {
    id: "comment-1",
    postId: "post-1",
    content: "建议先单独练习每个和弦的指法，确保按弦准确后再练习转换。可以从慢速开始，逐渐加快。",
    author: {
      id: "user-2",
      username: "音乐漫步者",
      avatar: "",
      level: 38,
    },
    createdAt: "2024-03-10T11:00:00Z",
    likes: 12,
  },
  {
    id: "comment-2",
    postId: "post-1",
    content: "我当时也是这个问题，后来发现是手指位置不对。C转G的时候，中指和无名指其实可以保持相对位置不变。",
    author: {
      id: "user-1",
      username: "吉他大神",
      avatar: "",
      level: 42,
    },
    createdAt: "2024-03-10T11:30:00Z",
    likes: 8,
  },
  {
    id: "comment-3",
    postId: "post-1",
    content: "可以用节拍器辅助练习，从很慢的速度开始，比如40BPM，每4拍换一次和弦，稳定后再加速。",
    author: {
      id: "user-3",
      username: "指尖舞者",
      avatar: "",
      level: 35,
    },
    createdAt: "2024-03-10T12:15:00Z",
    likes: 5,
  },
]

export const FORUM_CATEGORIES = ["全部", "求助", "经验分享", "讨论", "教程", "晒琴", "闲聊"]
