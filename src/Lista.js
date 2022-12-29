import { GroupedVirtuoso } from 'react-virtuoso'
import { generateGroupedUsers, generateUsers } from './data'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import React, { useMemo } from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';


export default function Lista() {
  const { users, groups, groupCounts } = generateGroupedUsers(500)

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <GroupedVirtuoso
      style={{ height: 400 }}
      groupCounts={groupCounts}
      components={MUIComponents}
      groupContent={(index) => {
        return <div>{groups[index]}</div>
      }}
      itemContent={(index) => {
        const user = users[index]
        const labelId = `checkbox-list-label-${index}`;
        return (
          <>
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={1} primary={`Line item ${index + 1}`} />
            </ListItemButton>
          </ListItem>
          </>
        )
      }}
    />
  )
}


const MUIComponents = {
  List: React.forwardRef(({ style, children }, listRef) => {
    return (
      <List style={{ padding: 0, ...style, margin: 0 }} component="div" ref={listRef}>
        {children}
      </List>
    )
  }),

  Item: ({ children, ...props }) => {
    return (
      <ListItem component="div" {...props} style={{ margin: 0 }}>
        {children}
      </ListItem>
    )
  },

  Group: ({ children, style, ...props }) => {
    return (
      <ListSubheader
        component="div"
        {...props}
        style={{
          ...style,
          backgroundColor: 'white',
          margin: 0,
        }}
      >
        {children}
      </ListSubheader>
    )
  },
}
