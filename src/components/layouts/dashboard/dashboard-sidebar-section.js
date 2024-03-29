import PropTypes from 'prop-types';
import { List, ListSubheader } from '@mui/material';
import { DashboardSidebarItem } from './dashboard-sidebar-item';

const renderNavItems = ({ depth = 0, child, path }) => (
    <List disablePadding>
        {child?.reduce((acc, item) => reduceChildRoutes({ acc, depth, item, path }), [])}
    </List>
);

const reduceChildRoutes = ({ acc, depth, item, path }) => {
    const key = `${item.name}-${depth}`;
    const partialMatch = item.link ? path?.includes(item.link) : false;
    const exactMatch = path?.split('?')[0] === item.link; // We don't compare query params

    //console.log('CHILDREN', item.child);

    if (Array.isArray(item.child)) {
        if (item.child.length !== 0) {
            acc.push(
                <DashboardSidebarItem
                    role ={item.role}
                    disabled={!item.enabled}
                    active={partialMatch}
                    chip={item.chip}
                    depth={depth}
                    icon={item.icon}
                    info={item.info}
                    key={key}
                    open={partialMatch}
                    path={item?.link ?? ""}
                    title={item.name}
                >
                    {renderNavItems({
                        depth: depth + 1,
                        child: item.child ,
                        path
                    })}
                </DashboardSidebarItem>
            );
        }
        else{
            acc.push(
                <DashboardSidebarItem
                    role ={item.role}
                    disabled={!item.enabled}
                    active={exactMatch}
                    chip={item.chip}
                    depth={depth}
                    icon={item.icon}
                    info={item.info}
                    key={key}
                    path={item?.link ?? ""}
                    title={item.name}
                />
            );
        }
    } else {
        acc.push(
            <DashboardSidebarItem
            role ={item.role}
                active={exactMatch}
                chip={item.chip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                path={item.link}
                title={item.name}
            />
        );
    }

    return acc;
};

export const DashboardSidebarSection = (props) => {
    //const { items, path, title, role, ...other } = props;
    //console.log('PROPS', props);
    const { child,  path, name, icon, ...other } = props;
    return (
        <List
            subheader={(
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        //color: 'neutral.500',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        lineHeight: 2.5,
                        ml: 4,
                        textTransform: 'uppercase'
                    }}
                >
                    {name}
                </ListSubheader>
            )}
            {...other}>
            {renderNavItems({
                child,
                path
            })}
        </List>
    );
};

DashboardSidebarSection.propTypes = {
    // items: PropTypes.array.isRequired,
    link: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired
};
