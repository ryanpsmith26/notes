# Git / GitHub

## **Setting up a new project**:

Once in your project folder you can run **git init** to initialize:

```git init``` 

Now you can use **git add** in order to stage the first file(s):

```git add <filename>```

Now your files are in the staging area but not committed. You can check what is in the staging area and what is not with **git status**:

```git status```

Now that your files are staged then you can make the commit to freeze the versions in time:

```git commit -m "some descriptive message"```

*IF A MESSAGE IS OMITTED YOU CAN ESCAPE WITH :qa!

* * *

## **Setting up GitHub repo**:

Now that Git is tracking your project files and you have a commit. Now you can create a GitHub repo. Once created you'll see:


**Push an existing repository from the command line:**

```git remote add origin https://github.com/ryanpsmith26/your-project-name.git```

```git push -u origin master```


Now you can connect Git to your GitHub repo withthe first commmand in the terminal.

Then push your commit into GitHubwith the second command.
* * *

## **Using Git**:

You can see a log of all commits with:

```git log```

You can see actual changes for a particular commit with:

```git show <commit id>```

Revert to a prior commit with:

```git reset --hard <commit-id>```

### **Branching**

To list all branches in the repository:

```git branch```

To create a new branch:

```git branch new-branch-name```

This will only create the branch. To switch to a specific branch and start working within it:

```git checkout another-branch```

Alternatively, if you want to create a new branch and immediately switch to it:

```git checkout -b new-branch-name```

### **Merging Branches**

To merge two branches (on your local repository) such as a feature branch and the master branch:

Ensure you are on the receiving branch (master would receive from feature branch):

```git checkout master```

Both the feature and master branches must be completely up-to-date, including with remote changes.

To pull and merge the most recent remote changes:

```git pull```

To merge the feature branch into the master branch:

```git merge feature-branch```

Delete the now-irrelevant feature branch:

```git branch -d feature-branch```

To change an existing branch name (make sure you're on that branch first then):

```git branch -m "new-name" ```
