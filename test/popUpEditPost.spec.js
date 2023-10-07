import popUpEditPost from '../src/components/popUpEditPost.js';

describe('popUpEditPost', () => {
  it('should be a function', () => {
    expect(typeof popUpEditPost).toBe('function');
  });
  it('should return a promise that resolves with the updated post', async () => {
    const post = { id: 1, title: 'Old Title', content: 'Old Content' };
    const updatedPost = { id: 1, title: 'New Title', content: 'New Content' };
    const mockUpdatePost = jest.fn(() => Promise.resolve(updatedPost));
    const result = await popUpEditPost(post, mockUpdatePost);
    expect(result).toBeInstanceOf(Promise);
    const resolvedValue = await result;
    expect(resolvedValue).toEqual(updatedPost);
    expect(mockUpdatePost).toHaveBeenCalledWith(post.id, updatedPost.title, updatedPost.content);
  });
});
