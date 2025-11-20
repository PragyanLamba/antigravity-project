using System.Text.Json;
using Antigravity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Antigravity.API.Data;

public class DbSeeder
{
    private readonly AppDbContext _context;

    public DbSeeder(AppDbContext context)
    {
        _context = context;
    }

    public async Task SeedAsync()
    {
        // Check if database is already populated
        if (await _context.Problems.AnyAsync())
        {
            return;
        }

        var problems = GetBlind75();

        // Optional: Check for external JSON file
        var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "problems.json");
        if (File.Exists(jsonPath))
        {
            try
            {
                var jsonString = await File.ReadAllTextAsync(jsonPath);
                var externalProblems = JsonSerializer.Deserialize<List<Problem>>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (externalProblems != null)
                {
                    // Merge external problems, avoiding duplicates by ID
                    foreach (var p in externalProblems)
                    {
                        if (!problems.Any(x => x.Id == p.Id))
                        {
                            problems.Add(p);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading problems.json: {ex.Message}");
            }
        }

        await _context.Problems.AddRangeAsync(problems);
        await _context.SaveChangesAsync();
        
        Console.WriteLine($"Seeded {problems.Count} problems into the database.");
    }

    private List<Problem> GetBlind75()
    {
        return new List<Problem>
        {
            // Array / String
            new() { Id = "two-sum", Title = "Two Sum", Difficulty = "Easy", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/two-sum/" },
            new() { Id = "best-time-to-buy-and-sell-stock", Title = "Best Time to Buy and Sell Stock", Difficulty = "Easy", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
            new() { Id = "contains-duplicate", Title = "Contains Duplicate", Difficulty = "Easy", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/contains-duplicate/" },
            new() { Id = "product-of-array-except-self", Title = "Product of Array Except Self", Difficulty = "Medium", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/product-of-array-except-self/" },
            new() { Id = "maximum-subarray", Title = "Maximum Subarray", Difficulty = "Medium", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/maximum-subarray/" },
            new() { Id = "maximum-product-subarray", Title = "Maximum Product Subarray", Difficulty = "Medium", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/maximum-product-subarray/" },
            new() { Id = "find-minimum-in-rotated-sorted-array", Title = "Find Minimum in Rotated Sorted Array", Difficulty = "Medium", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
            new() { Id = "search-in-rotated-sorted-array", Title = "Search in Rotated Sorted Array", Difficulty = "Medium", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
            new() { Id = "3sum", Title = "3Sum", Difficulty = "Medium", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/3sum/" },
            new() { Id = "container-with-most-water", Title = "Container With Most Water", Difficulty = "Medium", Topic = "Arrays", LeetcodeUrl = "https://leetcode.com/problems/container-with-most-water/" },

            // Binary
            new() { Id = "sum-of-two-integers", Title = "Sum of Two Integers", Difficulty = "Medium", Topic = "Binary", LeetcodeUrl = "https://leetcode.com/problems/sum-of-two-integers/" },
            new() { Id = "number-of-1-bits", Title = "Number of 1 Bits", Difficulty = "Easy", Topic = "Binary", LeetcodeUrl = "https://leetcode.com/problems/number-of-1-bits/" },
            new() { Id = "counting-bits", Title = "Counting Bits", Difficulty = "Easy", Topic = "Binary", LeetcodeUrl = "https://leetcode.com/problems/counting-bits/" },
            new() { Id = "missing-number", Title = "Missing Number", Difficulty = "Easy", Topic = "Binary", LeetcodeUrl = "https://leetcode.com/problems/missing-number/" },
            new() { Id = "reverse-bits", Title = "Reverse Bits", Difficulty = "Easy", Topic = "Binary", LeetcodeUrl = "https://leetcode.com/problems/reverse-bits/" },

            // DP
            new() { Id = "climbing-stairs", Title = "Climbing Stairs", Difficulty = "Easy", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/climbing-stairs/" },
            new() { Id = "coin-change", Title = "Coin Change", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/coin-change/" },
            new() { Id = "longest-increasing-subsequence", Title = "Longest Increasing Subsequence", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/longest-increasing-subsequence/" },
            new() { Id = "longest-common-subsequence", Title = "Longest Common Subsequence", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/longest-common-subsequence/" },
            new() { Id = "word-break", Title = "Word Break", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/word-break/" },
            new() { Id = "combination-sum", Title = "Combination Sum", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/combination-sum/" },
            new() { Id = "house-robber", Title = "House Robber", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/house-robber/" },
            new() { Id = "house-robber-ii", Title = "House Robber II", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/house-robber-ii/" },
            new() { Id = "decode-ways", Title = "Decode Ways", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/decode-ways/" },
            new() { Id = "unique-paths", Title = "Unique Paths", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/unique-paths/" },
            new() { Id = "jump-game", Title = "Jump Game", Difficulty = "Medium", Topic = "DP", LeetcodeUrl = "https://leetcode.com/problems/jump-game/" },

            // Graph
            new() { Id = "clone-graph", Title = "Clone Graph", Difficulty = "Medium", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/clone-graph/" },
            new() { Id = "course-schedule", Title = "Course Schedule", Difficulty = "Medium", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/course-schedule/" },
            new() { Id = "pacific-atlantic-water-flow", Title = "Pacific Atlantic Water Flow", Difficulty = "Medium", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
            new() { Id = "number-of-islands", Title = "Number of Islands", Difficulty = "Medium", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/number-of-islands/" },
            new() { Id = "longest-consecutive-sequence", Title = "Longest Consecutive Sequence", Difficulty = "Medium", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/longest-consecutive-sequence/" },
            new() { Id = "alien-dictionary", Title = "Alien Dictionary", Difficulty = "Hard", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/alien-dictionary/" },
            new() { Id = "graph-valid-tree", Title = "Graph Valid Tree", Difficulty = "Medium", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/graph-valid-tree/" },
            new() { Id = "number-of-connected-components-in-an-undirected-graph", Title = "Number of Connected Components in an Undirected Graph", Difficulty = "Medium", Topic = "Graph", LeetcodeUrl = "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },

            // Interval
            new() { Id = "insert-interval", Title = "Insert Interval", Difficulty = "Medium", Topic = "Interval", LeetcodeUrl = "https://leetcode.com/problems/insert-interval/" },
            new() { Id = "merge-intervals", Title = "Merge Intervals", Difficulty = "Medium", Topic = "Interval", LeetcodeUrl = "https://leetcode.com/problems/merge-intervals/" },
            new() { Id = "non-overlapping-intervals", Title = "Non-overlapping Intervals", Difficulty = "Medium", Topic = "Interval", LeetcodeUrl = "https://leetcode.com/problems/non-overlapping-intervals/" },
            new() { Id = "meeting-rooms", Title = "Meeting Rooms", Difficulty = "Easy", Topic = "Interval", LeetcodeUrl = "https://leetcode.com/problems/meeting-rooms/" },
            new() { Id = "meeting-rooms-ii", Title = "Meeting Rooms II", Difficulty = "Medium", Topic = "Interval", LeetcodeUrl = "https://leetcode.com/problems/meeting-rooms-ii/" },

            // Linked List
            new() { Id = "reverse-linked-list", Title = "Reverse Linked List", Difficulty = "Easy", Topic = "Linked List", LeetcodeUrl = "https://leetcode.com/problems/reverse-linked-list/" },
            new() { Id = "linked-list-cycle", Title = "Linked List Cycle", Difficulty = "Easy", Topic = "Linked List", LeetcodeUrl = "https://leetcode.com/problems/linked-list-cycle/" },
            new() { Id = "merge-two-sorted-lists", Title = "Merge Two Sorted Lists", Difficulty = "Easy", Topic = "Linked List", LeetcodeUrl = "https://leetcode.com/problems/merge-two-sorted-lists/" },
            new() { Id = "merge-k-sorted-lists", Title = "Merge k Sorted Lists", Difficulty = "Hard", Topic = "Linked List", LeetcodeUrl = "https://leetcode.com/problems/merge-k-sorted-lists/" },
            new() { Id = "remove-nth-node-from-end-of-list", Title = "Remove Nth Node From End of List", Difficulty = "Medium", Topic = "Linked List", LeetcodeUrl = "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
            new() { Id = "reorder-list", Title = "Reorder List", Difficulty = "Medium", Topic = "Linked List", LeetcodeUrl = "https://leetcode.com/problems/reorder-list/" },

            // Matrix
            new() { Id = "set-matrix-zeroes", Title = "Set Matrix Zeroes", Difficulty = "Medium", Topic = "Matrix", LeetcodeUrl = "https://leetcode.com/problems/set-matrix-zeroes/" },
            new() { Id = "spiral-matrix", Title = "Spiral Matrix", Difficulty = "Medium", Topic = "Matrix", LeetcodeUrl = "https://leetcode.com/problems/spiral-matrix/" },
            new() { Id = "rotate-image", Title = "Rotate Image", Difficulty = "Medium", Topic = "Matrix", LeetcodeUrl = "https://leetcode.com/problems/rotate-image/" },
            new() { Id = "word-search", Title = "Word Search", Difficulty = "Medium", Topic = "Matrix", LeetcodeUrl = "https://leetcode.com/problems/word-search/" },

            // String
            new() { Id = "longest-substring-without-repeating-characters", Title = "Longest Substring Without Repeating Characters", Difficulty = "Medium", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
            new() { Id = "longest-repeating-character-replacement", Title = "Longest Repeating Character Replacement", Difficulty = "Medium", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/longest-repeating-character-replacement/" },
            new() { Id = "minimum-window-substring", Title = "Minimum Window Substring", Difficulty = "Hard", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/minimum-window-substring/" },
            new() { Id = "valid-anagram", Title = "Valid Anagram", Difficulty = "Easy", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/valid-anagram/" },
            new() { Id = "group-anagrams", Title = "Group Anagrams", Difficulty = "Medium", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/group-anagrams/" },
            new() { Id = "valid-parentheses", Title = "Valid Parentheses", Difficulty = "Easy", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/valid-parentheses/" },
            new() { Id = "valid-palindrome", Title = "Valid Palindrome", Difficulty = "Easy", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/valid-palindrome/" },
            new() { Id = "longest-palindromic-substring", Title = "Longest Palindromic Substring", Difficulty = "Medium", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/longest-palindromic-substring/" },
            new() { Id = "palindromic-substrings", Title = "Palindromic Substrings", Difficulty = "Medium", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/palindromic-substrings/" },
            new() { Id = "encode-and-decode-strings", Title = "Encode and Decode Strings", Difficulty = "Medium", Topic = "String", LeetcodeUrl = "https://leetcode.com/problems/encode-and-decode-strings/" },

            // Tree
            new() { Id = "maximum-depth-of-binary-tree", Title = "Maximum Depth of Binary Tree", Difficulty = "Easy", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
            new() { Id = "same-tree", Title = "Same Tree", Difficulty = "Easy", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/same-tree/" },
            new() { Id = "invert-binary-tree", Title = "Invert Binary Tree", Difficulty = "Easy", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/invert-binary-tree/" },
            new() { Id = "binary-tree-maximum-path-sum", Title = "Binary Tree Maximum Path Sum", Difficulty = "Hard", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
            new() { Id = "binary-tree-level-order-traversal", Title = "Binary Tree Level Order Traversal", Difficulty = "Medium", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
            new() { Id = "serialize-and-deserialize-binary-tree", Title = "Serialize and Deserialize Binary Tree", Difficulty = "Hard", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
            new() { Id = "subtree-of-another-tree", Title = "Subtree of Another Tree", Difficulty = "Easy", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/subtree-of-another-tree/" },
            new() { Id = "construct-binary-tree-from-preorder-and-inorder-traversal", Title = "Construct Binary Tree from Preorder and Inorder Traversal", Difficulty = "Medium", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
            new() { Id = "validate-binary-search-tree", Title = "Validate Binary Search Tree", Difficulty = "Medium", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/validate-binary-search-tree/" },
            new() { Id = "kth-smallest-element-in-a-bst", Title = "Kth Smallest Element in a BST", Difficulty = "Medium", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
            new() { Id = "lowest-common-ancestor-of-a-binary-search-tree", Title = "Lowest Common Ancestor of a BST", Difficulty = "Easy", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
            new() { Id = "implement-trie-prefix-tree", Title = "Implement Trie (Prefix Tree)", Difficulty = "Medium", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/implement-trie-prefix-tree/" },
            new() { Id = "add-and-search-word-data-structure-design", Title = "Add and Search Word", Difficulty = "Medium", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/add-and-search-word-data-structure-design/" },
            new() { Id = "word-search-ii", Title = "Word Search II", Difficulty = "Hard", Topic = "Tree", LeetcodeUrl = "https://leetcode.com/problems/word-search-ii/" },

            // Heap
            new() { Id = "top-k-frequent-elements", Title = "Top K Frequent Elements", Difficulty = "Medium", Topic = "Heap", LeetcodeUrl = "https://leetcode.com/problems/top-k-frequent-elements/" },
            new() { Id = "find-median-from-data-stream", Title = "Find Median from Data Stream", Difficulty = "Hard", Topic = "Heap", LeetcodeUrl = "https://leetcode.com/problems/find-median-from-data-stream/" }
        };
    }
}
