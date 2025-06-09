---
layout: post
title: "React Component Patterns: Building Reusable and Maintainable UIs"
date: 2017-05-18 10:30:00 -0800
categories: [javascript, react]
tags: [react, components, jsx, patterns, state-management, higher-order-components]
description: "Essential React component patterns for building scalable, reusable, and maintainable user interfaces"
---

React has fundamentally changed how we think about building user interfaces. After two years of building production React applications, I've discovered that knowing the **right component patterns** is what separates good React developers from great ones. Let's explore the patterns that will make your React code more reusable, testable, and maintainable.

## The Evolution of React Components

React components have evolved significantly since the early days:

```javascript
// React 0.13: React.createClass
var MyComponent = React.createClass({
    getInitialState: function() {
        return { count: 0 };
    },
    render: function() {
        return <div>{this.state.count}</div>;
    }
});

// ES6 Classes (React 15+)
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    
    render() {
        return <div>{this.state.count}</div>;
    }
}

// Functional Components (React 0.14+)
const MyComponent = ({ count }) => <div>{count}</div>;
```

## Container vs Presentational Components

This is the most fundamental pattern in React architecture:

### Presentational Components
```javascript
// UserCard.js - Pure, reusable, focused on how things look
const UserCard = ({ user, onEdit, onDelete }) => (
    <div className="user-card">
        <img src={user.avatar} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <div className="actions">
            <button onClick={() => onEdit(user.id)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
    </div>
);

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
```

### Container Components
```javascript
// UserListContainer.js - Handles data fetching and state management
class UserListContainer extends React.Component {
    state = {
        users: [],
        loading: true,
        error: null
    };
    
    componentDidMount() {
        this.loadUsers();
    }
    
    loadUsers = async () => {
        try {
            this.setState({ loading: true });
            const users = await UserAPI.getUsers();
            this.setState({ users, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };
    
    handleEditUser = (userId) => {
        // Navigate to edit page or open modal
        this.props.history.push(`/users/${userId}/edit`);
    };
    
    handleDeleteUser = async (userId) => {
        try {
            await UserAPI.deleteUser(userId);
            this.setState(prevState => ({
                users: prevState.users.filter(user => user.id !== userId)
            }));
        } catch (error) {
            this.setState({ error });
        }
    };
    
    render() {
        const { users, loading, error } = this.state;
        
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage error={error} />;
        
        return (
            <div className="user-list">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={this.handleEditUser}
                        onDelete={this.handleDeleteUser}
                    />
                ))}
            </div>
        );
    }
}
```

## Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional functionality:

### Authentication HOC
```javascript
// withAuth.js
const withAuth = (WrappedComponent) => {
    return class AuthenticatedComponent extends React.Component {
        state = {
            isAuthenticated: false,
            loading: true
        };
        
        componentDidMount() {
            this.checkAuthentication();
        }
        
        checkAuthentication = async () => {
            try {
                const user = await AuthAPI.getCurrentUser();
                this.setState({ 
                    isAuthenticated: !!user, 
                    loading: false 
                });
            } catch (error) {
                this.setState({ 
                    isAuthenticated: false, 
                    loading: false 
                });
            }
        };
        
        render() {
            const { isAuthenticated, loading } = this.state;
            
            if (loading) {
                return <LoadingSpinner />;
            }
            
            if (!isAuthenticated) {
                return <LoginPage />;
            }
            
            return <WrappedComponent {...this.props} />;
        }
    };
};

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedUserProfile = withAuth(UserProfile);
```

### Loading HOC
```javascript
// withLoading.js
const withLoading = (WrappedComponent) => {
    return ({ isLoading, ...props }) => {
        if (isLoading) {
            return <LoadingSpinner />;
        }
        return <WrappedComponent {...props} />;
    };
};

// Usage
const UserListWithLoading = withLoading(UserList);

// In parent component
<UserListWithLoading 
    isLoading={this.state.loading}
    users={this.state.users}
/>
```

## Render Props Pattern

The render props pattern provides a way to share code between components using a prop whose value is a function:

### Mouse Position Tracker
```javascript
class Mouse extends React.Component {
    state = { x: 0, y: 0 };
    
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    };
    
    render() {
        return (
            <div 
                style={% raw %}{{ height: '100vh' }}{% endraw %} 
                onMouseMove={this.handleMouseMove}
            >
                {this.props.render(this.state)}
            </div>
        );
    }
}

// Usage
const App = () => (
    <Mouse
        render={({ x, y }) => (
            <div>
                <h1>Mouse position: ({x}, {y})</h1>
                <div 
                    style={% raw %}{{
                        position: 'absolute',
                        left: x,
                        top: y,
                        width: 20,
                        height: 20,
                        backgroundColor: 'red',
                        borderRadius: '50%',
                    }}{% endraw %}
                />
            </div>
        )}
    />
);
```

### Data Fetcher with Render Props
```javascript
class DataFetcher extends React.Component {
    state = {
        data: null,
        loading: true,
        error: null
    };
    
    componentDidMount() {
        this.fetchData();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.url !== this.props.url) {
            this.fetchData();
        }
    }
    
    fetchData = async () => {
        try {
            this.setState({ loading: true, error: null });
            const response = await fetch(this.props.url);
            const data = await response.json();
            this.setState({ data, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };
    
    render() {
        return this.props.children(this.state);
    }
}

// Usage
const UserProfile = ({ userId }) => (
    <DataFetcher url={`/api/users/${userId}`}>
        {({ data: user, loading, error }) => {
            if (loading) return <LoadingSpinner />;
            if (error) return <ErrorMessage error={error} />;
            if (!user) return <div>User not found</div>;
            
            return (
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            );
        }}
    </DataFetcher>
);
```

## Compound Components Pattern

Compound components work together to form a complete UI element:

```javascript
// Tabs.js
class Tabs extends React.Component {
    state = {
        activeTab: this.props.defaultTab || 0
    };
    
    setActiveTab = (index) => {
        this.setState({ activeTab: index });
    };
    
    render() {
        const { children } = this.props;
        const { activeTab } = this.state;
        
        return (
            <div className="tabs">
                {React.Children.map(children, (child, index) => 
                    React.cloneElement(child, {
                        activeTab,
                        setActiveTab: this.setActiveTab,
                        index
                    })
                )}
            </div>
        );
    }
}

const TabList = ({ children, activeTab, setActiveTab }) => (
    <div className="tab-list">
        {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
                isActive: index === activeTab,
                onClick: () => setActiveTab(index),
                index
            })
        )}
    </div>
);

const Tab = ({ children, isActive, onClick }) => (
    <button 
        className={`tab ${isActive ? 'active' : ''}`}
        onClick={onClick}
    >
        {children}
    </button>
);

const TabPanels = ({ children, activeTab }) => (
    <div className="tab-panels">
        {React.Children.toArray(children)[activeTab]}
    </div>
);

const TabPanel = ({ children }) => (
    <div className="tab-panel">
        {children}
    </div>
);

// Usage
const App = () => (
    <Tabs defaultTab={0}>
        <TabList>
            <Tab>Profile</Tab>
            <Tab>Settings</Tab>
            <Tab>Security</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <h2>Profile Content</h2>
                <p>User profile information goes here.</p>
            </TabPanel>
            <TabPanel>
                <h2>Settings Content</h2>
                <p>Application settings go here.</p>
            </TabPanel>
            <TabPanel>
                <h2>Security Content</h2>
                <p>Security settings go here.</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
);
```

## State Management Patterns

### Local State vs Lifted State

```javascript
// Local state - component manages its own state
class SearchBox extends React.Component {
    state = { query: '' };
    
    handleChange = (e) => {
        this.setState({ query: e.target.value });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSearch(this.state.query);
    };
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder="Search..."
                />
                <button type="submit">Search</button>
            </form>
        );
    }
}

// Lifted state - parent controls the state
const ControlledSearchBox = ({ query, onChange, onSearch }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(query); }}>
        <input 
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search..."
        />
        <button type="submit">Search</button>
    </form>
);

// Parent component manages the state
class SearchPage extends React.Component {
    state = {
        query: '',
        results: []
    };
    
    handleQueryChange = (query) => {
        this.setState({ query });
    };
    
    handleSearch = async (query) => {
        const results = await SearchAPI.search(query);
        this.setState({ results });
    };
    
    render() {
        return (
            <div>
                <ControlledSearchBox
                    query={this.state.query}
                    onChange={this.handleQueryChange}
                    onSearch={this.handleSearch}
                />
                <SearchResults results={this.state.results} />
            </div>
        );
    }
}
```

## Error Boundaries

Error boundaries catch JavaScript errors anywhere in the component tree:

```javascript
class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null
    };
    
    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
        
        // Log error to error reporting service
        console.error('Error caught by boundary:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Something went wrong.</h2>
                    <details style={% raw %}{{ whiteSpace: 'pre-wrap' }}{% endraw %}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        
        return this.props.children;
    }
}

// Usage
const App = () => (
    <ErrorBoundary>
        <Header />
        <MainContent />
        <Footer />
    </ErrorBoundary>
);
```

## Performance Optimization Patterns

### React.PureComponent and shouldComponentUpdate

```javascript
// PureComponent automatically implements shouldComponentUpdate
class UserCard extends React.PureComponent {
    render() {
        const { user, onEdit, onDelete } = this.props;
        return (
            <div className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <button onClick={() => onEdit(user.id)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
            </div>
        );
    }
}

// Manual shouldComponentUpdate for complex logic
class ExpensiveComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        // Only re-render if critical props change
        return (
            nextProps.userId !== this.props.userId ||
            nextProps.data.length !== this.props.data.length ||
            nextState.isExpanded !== this.state.isExpanded
        );
    }
    
    render() {
        // Expensive rendering logic here
        return <div>{/* Complex UI */}</div>;
    }
}
```

### Memoization Patterns

```javascript
// Memoize expensive calculations
class DataVisualization extends React.Component {
    memoizedProcessData = memoize((rawData, filters) => {
        // Expensive data processing
        return rawData
            .filter(filters.filterFn)
            .map(filters.transformFn)
            .sort(filters.sortFn);
    });
    
    render() {
        const processedData = this.memoizedProcessData(
            this.props.rawData,
            this.props.filters
        );
        
        return <Chart data={processedData} />;
    }
}

// Simple memoization utility
function memoize(fn) {
    let lastArgs;
    let lastResult;
    
    return (...args) => {
        if (!lastArgs || !shallowEqual(args, lastArgs)) {
            lastResult = fn(...args);
            lastArgs = args;
        }
        return lastResult;
    };
}
```

## Context API for State Management

React 16.3+ Context API provides a way to pass data through the component tree:

```javascript
// Create context
const ThemeContext = React.createContext();
const UserContext = React.createContext();

// Provider component
class App extends React.Component {
    state = {
        theme: 'light',
        user: null
    };
    
    toggleTheme = () => {
        this.setState(prevState => ({
            theme: prevState.theme === 'light' ? 'dark' : 'light'
        }));
    };
    
    render() {
        return (
            <ThemeContext.Provider value={% raw %}{{
                theme: this.state.theme,
                toggleTheme: this.toggleTheme
            }}{% endraw %}>
                <UserContext.Provider value={this.state.user}>
                    <Header />
                    <MainContent />
                    <Footer />
                </UserContext.Provider>
            </ThemeContext.Provider>
        );
    }
}

// Consumer component
const ThemedButton = () => (
    <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
            <button 
                className={`btn btn-${theme}`}
                onClick={toggleTheme}
            >
                Switch to {theme === 'light' ? 'dark' : 'light'} theme
            </button>
        )}
    </ThemeContext.Consumer>
);

// HOC for easier context consumption
const withTheme = (Component) => {
    return (props) => (
        <ThemeContext.Consumer>
            {themeProps => <Component {...props} {...themeProps} />}
        </ThemeContext.Consumer>
    );
};

const ThemedButtonWithHOC = withTheme(({ theme, toggleTheme }) => (
    <button 
        className={`btn btn-${theme}`}
        onClick={toggleTheme}
    >
        Switch theme
    </button>
));
```

## Testing Patterns

### Component Testing with Enzyme

```javascript
import React from 'react';
import { shallow, mount } from 'enzyme';
import UserCard from './UserCard';

describe('UserCard', () => {
    const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'avatar.jpg'
    };
    
    const mockProps = {
        user: mockUser,
        onEdit: jest.fn(),
        onDelete: jest.fn()
    };
    
    it('should render user information', () => {
        const wrapper = shallow(<UserCard {...mockProps} />);
        
        expect(wrapper.find('h3').text()).toBe('John Doe');
        expect(wrapper.find('p').text()).toBe('john@example.com');
        expect(wrapper.find('img').prop('src')).toBe('avatar.jpg');
    });
    
    it('should call onEdit when edit button is clicked', () => {
        const wrapper = shallow(<UserCard {...mockProps} />);
        
        wrapper.find('button').at(0).simulate('click');
        
        expect(mockProps.onEdit).toHaveBeenCalledWith(1);
    });
    
    it('should call onDelete when delete button is clicked', () => {
        const wrapper = shallow(<UserCard {...mockProps} />);
        
        wrapper.find('button').at(1).simulate('click');
        
        expect(mockProps.onDelete).toHaveBeenCalledWith(1);
    });
});
```

### Testing HOCs

```javascript
import { shallow } from 'enzyme';
import withAuth from './withAuth';

// Create a dummy component for testing
const DummyComponent = () => <div>Protected Content</div>;
const ProtectedComponent = withAuth(DummyComponent);

describe('withAuth HOC', () => {
    it('should show loading spinner while checking authentication', () => {
        const wrapper = shallow(<ProtectedComponent />);
        expect(wrapper.find('LoadingSpinner')).toHaveLength(1);
    });
    
    it('should show login page when not authenticated', async () => {
        // Mock AuthAPI to return null user
        AuthAPI.getCurrentUser = jest.fn().mockResolvedValue(null);
        
        const wrapper = shallow(<ProtectedComponent />);
        await new Promise(resolve => setImmediate(resolve)); // Wait for async
        wrapper.update();
        
        expect(wrapper.find('LoginPage')).toHaveLength(1);
    });
    
    it('should render wrapped component when authenticated', async () => {
        // Mock AuthAPI to return a user
        AuthAPI.getCurrentUser = jest.fn().mockResolvedValue({ id: 1 });
        
        const wrapper = shallow(<ProtectedComponent />);
        await new Promise(resolve => setImmediate(resolve)); // Wait for async
        wrapper.update();
        
        expect(wrapper.find(DummyComponent)).toHaveLength(1);
    });
});
```

## Modern React Patterns (2017)

### React Router v4 Patterns

```javascript
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const App = () => (
    <BrowserRouter>
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/users">Users</Link>
                <Link to="/about">About</Link>
            </nav>
            
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users/:id" component={UserProfile} />
                <Route path="/users" component={UserList} />
                <Route path="/about" component={About} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

// Route render prop for passing additional props
<Route 
    path="/users/:id" 
    render={(props) => 
        <UserProfile 
            {...props} 
            currentUser={this.state.currentUser} 
        />
    } 
/>
```

### Code Splitting with React.lazy (Future)

```javascript
// React 16.6+ (Future feature, but worth knowing)
const LazyUserProfile = React.lazy(() => import('./UserProfile'));
const LazyDashboard = React.lazy(() => import('./Dashboard'));

const App = () => (
    <div>
        <Suspense fallback={<LoadingSpinner />}>
            <Switch>
                <Route path="/profile" component={LazyUserProfile} />
                <Route path="/dashboard" component={LazyDashboard} />
            </Switch>
        </Suspense>
    </div>
);
```

## Conclusion

React's power lies in its composable component model, but knowing the right patterns is crucial for building maintainable applications:

### Key Takeaways:
1. **Separate concerns** with container/presentational components
2. **Share logic** with HOCs and render props
3. **Compose UIs** with compound components
4. **Manage state** appropriately (local vs lifted vs global)
5. **Handle errors** gracefully with error boundaries
6. **Optimize performance** with PureComponent and memoization
7. **Test thoroughly** with isolated unit tests

### What's Coming Next:
- **React Hooks** (experimental but promising)
- **Async rendering** with React Fiber
- **Better code splitting** with React.lazy
- **Improved testing** with React Testing Library

The React ecosystem is constantly evolving, but these fundamental patterns will serve as the foundation for building robust React applications. Master these patterns, and you'll be well-equipped to tackle any React project.

**Remember: Good component design is about finding the right balance between reusability, simplicity, and performance.** 