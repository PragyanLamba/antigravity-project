import fetch from 'node-fetch';

const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'DP', 'Graphs', 'Backtracking', 'Stack', 'Heap', 'Bit Manipulation'];
const difficulties = ['Easy', 'Medium', 'Hard'];

// Real curated list (Blind 75 subset for quality)
const curatedProblems = [
    { id: "two-sum", title: "Two Sum", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/two-sum/" },
    { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/" },
    { id: "merge-two-sorted-lists", title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { id: "best-time-to-buy-and-sell-stock", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { id: "group-anagrams", title: "Group Anagrams", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/group-anagrams/" },
    { id: "maximum-subarray", title: "Maximum Subarray", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/" },
    { id: "reverse-linked-list", title: "Reverse Linked List", difficulty: "Easy", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/" },
    { id: "climbing-stairs", title: "Climbing Stairs", difficulty: "Easy", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/" },
    { id: "longest-substring-without-repeating-characters", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { id: "3sum", title: "3Sum", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/3sum/" },
    { id: "container-with-most-water", title: "Container With Most Water", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/" },
    { id: "number-of-islands", title: "Number of Islands", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/number-of-islands/" },
    { id: "reverse-bits", title: "Reverse Bits", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/reverse-bits/" },
    { id: "number-of-1-bits", title: "Number of 1 Bits", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/" },
    { id: "missing-number", title: "Missing Number", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/missing-number/" },
    { id: "sum-of-two-integers", title: "Sum of Two Integers", difficulty: "Medium", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/sum-of-two-integers/" },
    { id: "reverse-integer", title: "Reverse Integer", difficulty: "Medium", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/reverse-integer/" },
    { id: "palindrome-number", title: "Palindrome Number", difficulty: "Easy", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/palindrome-number/" },
    { id: "roman-to-integer", title: "Roman to Integer", difficulty: "Easy", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/roman-to-integer/" },
    { id: "longest-common-prefix", title: "Longest Common Prefix", difficulty: "Easy", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/" },
    { id: "valid-anagram", title: "Valid Anagram", difficulty: "Easy", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/valid-anagram/" },
    { id: "contains-duplicate", title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/" },
    { id: "maximum-depth-of-binary-tree", title: "Maximum Depth of Binary Tree", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    { id: "validate-binary-search-tree", title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/" },
    { id: "symmetric-tree", title: "Symmetric Tree", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/" },
    { id: "binary-tree-level-order-traversal", title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { id: "convert-sorted-array-to-binary-search-tree", title: "Convert Sorted Array to Binary Search Tree", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
    { id: "construct-binary-tree-from-preorder-and-inorder-traversal", title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
    { id: "binary-tree-maximum-path-sum", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { id: "serialize-and-deserialize-binary-tree", title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
    { id: "implement-trie-prefix-tree", title: "Implement Trie (Prefix Tree)", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
    { id: "add-and-search-word-data-structure-design", title: "Add and Search Word - Data Structure Design", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/add-and-search-word-data-structure-design/" },
    { id: "word-search-ii", title: "Word Search II", difficulty: "Hard", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/word-search-ii/" },
    { id: "merge-k-sorted-lists", title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Heap", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    { id: "top-k-frequent-elements", title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heap", leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { id: "find-median-from-data-stream", title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heap", leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/" },
    { id: "insert-interval", title: "Insert Interval", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/insert-interval/" },
    { id: "merge-intervals", title: "Merge Intervals", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/merge-intervals/" },
    { id: "non-overlapping-intervals", title: "Non-overlapping Intervals", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/" },
    { id: "meeting-rooms", title: "Meeting Rooms", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/" },
    { id: "meeting-rooms-ii", title: "Meeting Rooms II", difficulty: "Medium", topic: "Heap", leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/" },
    { id: "rotate-image", title: "Rotate Image", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/rotate-image/" },
    { id: "spiral-matrix", title: "Spiral Matrix", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/" },
    { id: "set-matrix-zeroes", title: "Set Matrix Zeroes", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/" },
    { id: "search-a-2d-matrix", title: "Search a 2D Matrix", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/" },
    { id: "word-search", title: "Word Search", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/word-search/" },
    { id: "longest-consecutive-sequence", title: "Longest Consecutive Sequence", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/" },
    { id: "valid-palindrome", title: "Valid Palindrome", difficulty: "Easy", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/" },
    { id: "longest-palindromic-substring", title: "Longest Palindromic Substring", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { id: "palindromic-substrings", title: "Palindromic Substrings", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/" },
    { id: "encode-and-decode-strings", title: "Encode and Decode Strings", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/encode-and-decode-strings/" },
    { id: "clone-graph", title: "Clone Graph", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/clone-graph/" },
    { id: "course-schedule", title: "Course Schedule", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/course-schedule/" },
    { id: "pacific-atlantic-water-flow", title: "Pacific Atlantic Water Flow", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
    { id: "number-of-connected-components-in-an-undirected-graph", title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
    { id: "graph-valid-tree", title: "Graph Valid Tree", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/" },
    { id: "alien-dictionary", title: "Alien Dictionary", difficulty: "Hard", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/" },
    { id: "coin-change", title: "Coin Change", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/coin-change/" },
    { id: "longest-increasing-subsequence", title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    { id: "longest-common-subsequence", title: "Longest Common Subsequence", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/" },
    { id: "word-break", title: "Word Break", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/word-break/" },
    { id: "combination-sum", title: "Combination Sum", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/combination-sum/" },
    { id: "house-robber", title: "House Robber", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/house-robber/" },
    { id: "house-robber-ii", title: "House Robber II", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/" },
    { id: "decode-ways", title: "Decode Ways", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/decode-ways/" },
    { id: "unique-paths", title: "Unique Paths", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/unique-paths/" },
    { id: "jump-game", title: "Jump Game", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/jump-game/" },
];

// Generate remaining to reach 1000
const generatedProblems = [];
for (let i = curatedProblems.length + 1; i <= 1000; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    generatedProblems.push({
        id: `problem-${i}`,
        title: `Problem ${i}: ${topic} Challenge`,
        difficulty: difficulty,
        topic: topic,
        leetcodeUrl: `https://leetcode.com/problems/problem-${i}/`,
        isRecommendedForBeginners: Math.random() > 0.8
    });
}

const allProblems = [...curatedProblems, ...generatedProblems];

async function seed() {
    try {
        console.log(`Seeding ${allProblems.length} problems...`);
        const response = await fetch('http://localhost:5160/api/problems/seed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(allProblems),
        });

        if (response.ok) {
            console.log('Database seeded successfully with 1000 problems!');
        } else {
            console.error('Failed to seed database:', await response.text());
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seed();
