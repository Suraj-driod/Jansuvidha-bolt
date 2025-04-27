import { Issue, Comment, mockIssues } from './mock-data';

class Store {
  private static instance: Store;
  private issues: Issue[] = mockIssues;
  private communityPosts: Issue[] = mockIssues.slice(0, 2);
  private currentId = mockIssues.length + 1;

  private constructor() {}

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public getAllIssues = (): Issue[] => this.issues;
  public getCommunityPosts = (): Issue[] => this.communityPosts;
  public getIssueById = (id: string): Issue | undefined => 
    this.issues.find(issue => issue.id === id) || 
    this.communityPosts.find(issue => issue.id === id);

  public createIssue(issueData: Omit<Issue, 'id'> & { postToCommunity?: boolean }): Issue {
    const { postToCommunity, ...data } = issueData;
    const newIssue = {
      ...data,
      id: String(this.currentId++),
      votes: { upvotes: 0, downvotes: 0 },
      comments: [],
      reportedBy: '@user' + Math.floor(Math.random() * 1000)
    };

    this.issues.push(newIssue);
    if (postToCommunity) {
      this.communityPosts.push({ ...newIssue });
    }

    return newIssue;
  }

  public updateIssue(id: string, updateData: Partial<Issue>): Issue | undefined {
    const update = (array: Issue[]) => {
      const index = array.findIndex(item => item.id === id);
      if (index !== -1) {
        array[index] = { ...array[index], ...updateData };
        return array[index];
      }
      return undefined;
    };

    return update(this.issues) || update(this.communityPosts);
  }

  public deleteIssue(id: string): boolean {
    const initialLength = this.issues.length + this.communityPosts.length;
    this.issues = this.issues.filter(issue => issue.id !== id);
    this.communityPosts = this.communityPosts.filter(post => post.id !== id);
    return this.issues.length + this.communityPosts.length < initialLength;
  }

  public addComment(issueId: string, comment: Omit<Comment, 'id'>): Comment | undefined {
    const issue = this.getIssueById(issueId);
    if (!issue) return undefined;

    const newComment = {
      ...comment,
      id: `c${Date.now()}`
    };
    issue.comments.push(newComment);
    return newComment;
  }

  public updateVotes(issueId: string, type: 'upvote' | 'downvote'): boolean {
    const issue = this.getIssueById(issueId);
    if (!issue) return false;
    
    issue.votes[type === 'upvote' ? 'upvotes' : 'downvotes']++;
    return true;
  }
}

export const store = Store.getInstance();