export function calculateTotalReactions(reactions) {
  return reactions.reduce((total, reaction) => total + reaction.quantity, 0);
}

export function sortedByReactions(posts) {
  const sortedPosts = posts.sort((a, b) => {
    const totalReactionsA = calculateTotalReactions(a.reactions);
    const totalReactionsB = calculateTotalReactions(b.reactions);
    return totalReactionsB - totalReactionsA;
  });

  return sortedPosts;
}

export function sortedByDate(posts) {
  const latest = posts.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  return latest;
}
